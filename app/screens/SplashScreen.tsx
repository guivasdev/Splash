import { FC, useEffect } from "react"
import { ActivityIndicator, ViewStyle } from "react-native"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { ThemedStyle } from "@/theme/types"
import { FIRST_TIME, load, save } from "@/utils/storage"
import { useNavigation } from "@react-navigation/native"
import { Button } from "@/components/Button"
// Pull in navigation via hook
// const navigation = useNavigation()
interface SplashScreenProps extends AppStackScreenProps<"Splash"> { }

export const SplashScreen: FC<SplashScreenProps> = () => {
  const { themed, theme: { colors }, } = useAppTheme()
  const navigation = useNavigation();


  const isReady = () => {
    const isAlready = load(FIRST_TIME)
    console.log(isAlready)
    if (!isAlready) {
      save(FIRST_TIME, 'true')
      console.log('bb:', isAlready)

      return true
    }
    console.log('aa:', isAlready)
    return false


  }
  useEffect(() => {

    const init = () => {
      const goScreen = isReady()
      if (goScreen)
        navigation.navigate('First' as never)
      else
        navigation.navigate('Home' as never)

    }
    init()

  }, [])


  return (

    <Screen contentContainerStyle={themed($root)} preset="scroll">

      <Text style={{ color: 'white', fontSize: 20, letterSpacing: 1.5, fontWeight: 'bold', textAlign: 'center', lineHeight: 40 }} text="Carregando Dados..." />
      <ActivityIndicator size="large" color="#0c9e8d" />
      
    </Screen>
  )
}

const $root: ThemedStyle<ViewStyle> = () => ({
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  backgroundColor: '#363636'
})


