import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import {Redirect, router} from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/customButton';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
  const {isLoading, isLoggedIn} = useGlobalContext()

  if(!isLoading && isLoggedIn) return <Redirect href='/home'/>

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView 
        contentContainerStyle={{
          height: '100%'
        }}
      >
        <View className='w-full min-h-[85vh] items-center justify-center px-4 '>
          <Image 
            source={images.logo}
            className='h-[84px] w-[134px]'
            resizeMode='contain'
          />

          <Image 
            source={images.cards}
            className='w-full h-[300px] max-w-[380px]'
            resizeMode='contain'
          />

          <View className='relative mt-5'>
            <Text className='text-white font-bold text-center text-3xl'>
              Discover Endless Possibility With
              <Text className='text-secondary-200'>
                {' '}Aora
              </Text>
            </Text>

            <Image 
              source={images.path}
              className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
              resizeMode='contain'
            />
          </View>

          <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
            Where creativity meets innovation : 
            embark on a journey with limitless exploration with Aora
          </Text>

          <CustomButton 
            title='Continue with Email'
            handlePress={() => router.push('/signIn')}
            containerStyles='w-full mt-7'
          /> 
        </View>
      </ScrollView>

      <StatusBar style='light' backgroundColor='#161622'/>
    </SafeAreaView>
  );
}

