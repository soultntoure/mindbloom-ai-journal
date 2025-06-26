import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import Button from '../components/Button';
import { getJournalEntries, JournalEntry } from '../api/journalService';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        // Uncomment when auth is ready
        // const data = await getJournalEntries();
        // setEntries(data);
      } catch (error) {
        console.error('Failed to fetch entries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="New Journal Entry"
        onPress={() => navigation.navigate('JournalEntry', {})}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#6C63FF" />
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.entryCard}>
              <Text style={styles.entryMood}>{item.mood}</Text>
              <Text style={styles.entryContent} numberOfLines={2}>{item.content}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No entries yet. Create one!</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  entryCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryMood: {
    fontSize: 24,
    marginRight: 16,
  },
  entryContent: {
    flex: 1,
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});

export default HomeScreen;
