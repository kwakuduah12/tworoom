// import { View, Text } from "react-native";

// export default function EnterEmail() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Routing works 🎉</Text>
//     </View>
//   );
// }

import { View, Text } from "react-native";
import { auth } from "../../src/firebase";

export default function EnterEmail() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Firebase connected</Text>
      <Text>{auth.app.options.projectId}</Text>
    </View>
  );
}