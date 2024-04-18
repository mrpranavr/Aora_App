import { View, Text, FlatList, Image, RefreshControl, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from '../../constants'
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts)
  const { data: latestPosts, refetch: refetchLastest } = useAppwrite(getLatestPosts)
  const [refreshing, setRefreshing] = useState(false)

  // console.log('posts here --> ', posts)

  const {user} = useGlobalContext()

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch();
    await refetchLastest();
    setRefreshing(false)
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        // data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard 
          video={item}
        />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className='flex-row justify-between items-start mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>Welcome back,</Text>
                <Text className='text-2xl font-psemibold text-white'>{user?.username}</Text>
              </View>

              <View className='mt-1.5'>
                <Image 
                  source={images.logoSmall}
                  className='w-9 h-10'
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 font-pregular mb-3 text-lg'>
                Latest Videos
              </Text>

              <Trending 
                posts={latestPosts ?? []}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title='No Videos Found'
            subtitle='Be the first one to upload a video'
          />
        )}

        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Home;
