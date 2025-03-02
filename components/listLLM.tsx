import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { ModelData } from "@/context/openrouterApi";
import aiAbout from "../app/Screens/iaAbout";

interface ListLLMProps {
    model: ModelData;
  }
  export default function ListLLM({ model }: ListLLMProps) {
    const router = useRouter();
    const handleModelPress = () => {
      router.push({
        pathname: "/Screens/iaAbout",
        params: { model: JSON.stringify(model),
        },
      });
    };
  return (
    <TouchableOpacity style={styles.modelItem} onPress={handleModelPress}>
      <View style={styles.modelIcon}>
        <Text style={styles.emojiIcon}>🤖</Text>
      </View>
      <View style={styles.modelInfo}>
        <Text style={styles.modelName}>{model.name}</Text>
        <Text style={styles.modelCompany}>{model.top_provider.company}</Text>
        <Text style={styles.modelDescription} numberOfLines={1} ellipsizeMode="tail">
          {model.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f2ff',
        padding: 16,
      },
      header: {
        marginBottom: 16,
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
      },
      searchBar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      searchPlaceholder: {
        color: '#888',
        marginLeft: 8,
      },
      filterIcon: {
        fontSize: 20,
      },
      categories: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
      },
      category: {
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 16,
        alignItems: 'center',
        width: '30%',
      },
      categoryWatchlists: {
        backgroundColor: '#e8f8e8',
      },
      categoryTrending: {
        backgroundColor: '#e8f0f8',
      },
      categoryBestValue: {
        backgroundColor: '#fff0e8',
      },
      categoryIcon: {
        fontSize: 18,
        marginBottom: 4,
      },
      categoryText: {
        fontSize: 12,
        fontWeight: '500',
      },
      listContent: {
        paddingBottom: 16,
      },
      modelItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
      },
      modelIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f8',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
      },
      emojiIcon: {
        fontSize: 24,
      },
      modelInfo: {
        flex: 1,
      },
      modelName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
      },
      modelCompany: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
      },
      modelDescription: {
        fontSize: 14,
        color: '#666',
      },
      loader: {
        marginTop: 40,
      },
      errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 40,
      },
    });
    
