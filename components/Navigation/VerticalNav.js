import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import VerticalsMainPage from '../Verticals/VerticalMainPage';
import CreateVertical from '../Verticals/CreateVertical';
import CreateVerticalFields from '../Verticals/CreateVerticalFields';
import DefaultFields from '../Verticals/DefaultFields';
import AddField from '../Verticals/AddField';
import Profilenav from '../Navigation/profilenav';
import ProfileDetails from '../UserManagement/ProfileDetails';
import SettingsScreen from '../UserManagement/SettingsScreen'
// const App = () => {
//   return <MainNavigator />;
// };
const VerticalNavigator = createStackNavigator(
  {
    VerticalsMainPage: { screen: VerticalsMainPage },
    CreateVertical: { screen: CreateVertical },
    CreateVerticalFields: { screen: CreateVerticalFields },
    DefaultFields: { screen: DefaultFields },
    AddField: { screen: AddField },
    ProfileDetails: { screen: ProfileDetails },
    SettingsScreen: { screen: SettingsScreen },
    // profile: { screen: Profilenav }
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const VerticalNav = createAppContainer(VerticalNavigator);
export default VerticalNav;
