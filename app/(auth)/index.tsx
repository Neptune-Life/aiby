import React from 'react';
import {  StyleSheet, View, Text, TouchableOpacity, SafeAreaView,Image,Dimensions} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  // Navigation functions would go here in a real app
  const handleGetStarted = () => {
    router.replace('/signin');
    console.log('Navigate to Auth Screen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>AI</Text>
          </View>
        </View>
        
        {/* App Name */}
        <Text style={styles.appName}>ChatAssist</Text>
        
        {/* Illustration - simple shape */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustration}>
            <View style={styles.chatBubble}>
              <View style={styles.chatDot}></View>
              <View style={styles.chatDot}></View>
              <View style={styles.chatDot}></View>
            </View>
          </View>
        </View>
        
        {/* Welcome Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.title}>Welcome to ChatAssist</Text>
          <Text style={styles.subtitle}>
            Your personal AI assistant ready to help with anything you need
          </Text>
        </View>
        
        {/* Call to Action Button */}
        <TouchableOpacity 
          style={styles.button}
          onPress={handleGetStarted}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        
        {/* Privacy Notice */}
        <Text style={styles.privacyText}>
          We value your privacy. Read our{' '}
          <Text style={styles.privacyLink}>Privacy Policy</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 40,
  },
  illustrationContainer: {
    width: width * 0.7,
    height: width * 0.7,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.35,
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatBubble: {
    width: '60%',
    height: '30%',
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chatDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
    marginHorizontal: 5,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    width: '100%',
    height: 54,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  privacyText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginTop: 16,
  },
  privacyLink: {
    color: '#007AFF',
    fontWeight: '500',
  },
});