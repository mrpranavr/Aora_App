import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ({title, subtitle, containerStyles, titleStyles}) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white font-psemibold text-center ${titleStyles}`}>{title}</Text>
      {subtitle && (
        <Text className='text-gray-100 text-center font-pregular text-sm'>{subtitle}</Text>
      )}
    </View>
  )
}

export default InfoBox