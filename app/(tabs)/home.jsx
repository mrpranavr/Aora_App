import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={[{ id: 1 }]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Text className="text-3xl">{item.id}</Text>}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className='flex-row justify-between items-start mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>Welcome back</Text>
                <Text className='text-2xl font-psemibold text-white'>Icarus</Text>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
