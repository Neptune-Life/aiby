import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity,Pressable,TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListLLM from '@/components/listLLM';
import { fetchOpenRouterModels, ModelData } from '@/context/openrouterApi';
import { useIcon } from '@/context/iconContext';

const ModelMarket = () => {
  const [models, setModels] = useState<ModelData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const SearchIcom = useIcon('search');
  const filteredModels = models.filter(model =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  useEffect(() => {
    const getModels = async () => {
      try {
        setLoading(true);
        const response = await fetchOpenRouterModels();
        
        setModels(response.data);
      } catch (err) {
        setError('Failed to fetch models');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getModels();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search models"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <SearchIcom color="#888" size={20} />
      </View>
      </View>

      <View style={styles.categories}>
        <TouchableOpacity style={[styles.category, styles.categoryWatchlists]}>
          <Text style={styles.categoryIcon}>⭐</Text>
          <Text style={styles.categoryText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.category, styles.categoryTrending]}>
          <Text style={styles.categoryIcon}>↗</Text>
          <Text style={styles.categoryText}>Trending</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.category, styles.categoryBestValue]}>
          <Text style={styles.categoryIcon}>💎</Text>
          <Text style={styles.categoryText}>Best value</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#8A2BE2" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
        data={filteredModels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListLLM 
            model={item}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },  
  searchPlaceholder: {
    color: '#888',
    marginLeft: 8,
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

export default ModelMarket;