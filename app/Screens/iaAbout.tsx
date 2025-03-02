import { View, Text, StyleSheet, TouchableOpacity,ScrollView,SafeAreaView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ModelData } from "@/context/openrouterApi";

export default function IaAbout() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const model: ModelData = JSON.parse(params.model as string);

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.modelName}>{model.name}</Text>
        <Text style={styles.company}>{model.top_provider.company}</Text>
        <TouchableOpacity style={styles.chatButton}onPress={() => router.push("/biby)/index")}>
          <Text style={styles.chatButtonText}>Open Chat</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.details}>
        <Text style={styles.description}>{model.description}</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Context Length:</Text>
          <Text>{model.context_length}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Max Completion Tokens:</Text>
          <Text>{model.top_provider.max_completion_tokens}</Text>
        </View>

      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 24,
  },
  modelName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
    marginBottom: 16,
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontWeight: '600',
    color: '#333',
  },
  pricing: {
    marginTop: 24,
  },
  chatButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
