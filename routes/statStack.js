import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import About from '../screen/set'
import Stat from '../screen/stat'

const screen = {
    Statistic:{
        screen: Stat
    },
    About:{
        screen: About
    }
}

const statStack = createStackNavigator()
