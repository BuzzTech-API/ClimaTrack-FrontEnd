import { Text, View } from "react-native"
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

//Página temporária

type ParamList = {

    search: undefined
    result:{
      latNumber: number,
      longNumber: number,
      startDateNumber: number,
      endDateNumber: number
    }
  };
  
  type Props = StackScreenProps<ParamList, 'result'>;
  
const TestResult:React.FC<Props> = ({route}) => {
    
    const inputValues = route.params
    inputValues

    return(
        <View>
            <Text>Data Inicial: {inputValues.startDateNumber}</Text>
            <Text>Data Final: {inputValues.endDateNumber}</Text>
            <Text>Latitude: {inputValues.latNumber}</Text>
            <Text>Longitude: {inputValues.longNumber}</Text>
        </View>
    )

}


export default TestResult