import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from '../../components/customButton'
import {Link, router} from 'expo-router'
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({
    userName: '',
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if(!form.userName || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields')
      return
    }

    setIsSubmitting(true)

    try {
      const result = await createUser(form.email, form.password, form.userName)
      // set it to global state using contect
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  
  }

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="min-h-[82vh] w-full px-4 my-6 justify-center">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white font-psemibold mt-10">
            Sign Up to Aora
          </Text>

          <FormField
            title="UserName"
            value={form.userName}
            handleChangeText={(e) => setForm({ ...form, userName: e })}
            otherStyles="mt-10"
            // keyboardType="email-address"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            // keyboardType="email-address"
          />

          <CustomButton 
            title = 'Sign Up'
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-gray-100 text-lg font-pregular'>Already have an account ?</Text>
            <Link href='/signIn' className="text-lg text-secondary font-psemibold">Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
