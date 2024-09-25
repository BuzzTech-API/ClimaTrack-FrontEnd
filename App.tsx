import { ScrollView } from "react-native";
import GraphicRainfall from "src/components/graphicRainfall";
import GraphicTemperature from "~/components/graphicTemperature";


export default function App() {
    return (
        <ScrollView>
            <GraphicRainfall/>
            <GraphicTemperature/>
        </ScrollView>
    )
}
