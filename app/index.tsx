import { Redirect } from 'expo-router';
import { useAuth } from '@/context/authContext';

export default function Index() {
  //const { userRole, isLoading } = useAuth();

 //if (isLoading) {
   // return null; // or a loading spinner
 //}
  const userRole = 2;
  console.log(userRole)
  if (!userRole) {
    return <Redirect href="/(auth)" />;
  }

  if (userRole === 2) {
    return <Redirect href="/(biby)" />;
  }

  return <Redirect href="/(auth)" />;
}
