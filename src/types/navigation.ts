import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type ProfileStackParamList = {
  ProfileMain: undefined;
  Settings: undefined;
  Activity: undefined;
  HelpCenter: undefined;
  Post: undefined;
  Comments: { postId?: string } | undefined;
  Account: undefined;
  Privacy: undefined;
  Security: undefined;
  Freespace: undefined;
  LogInOut: undefined;
};

export type MoreStackParamList = {
  MoreMain: undefined;
  Address: undefined;
  News: undefined;
  Authorities: undefined;
  Legacy: undefined;
};

export type RootStackParamList = {
  Main: undefined;
  Search: undefined;
};

export type TabParamList = {
  Home: undefined;
  Create: undefined;
  Profile: undefined;
  More: undefined;
};

export type PostScreenProps = NativeStackScreenProps<ProfileStackParamList, 'Post'>;
