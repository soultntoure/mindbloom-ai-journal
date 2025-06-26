import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import Button from '../components/Button';
import MoodSelector from '../components/MoodSelector';
import { createJournalEntry, getAIPrompt } from '../api/journalService';

type Props = NativeStackScreenProps<RootStackParamList, 'JournalEntry'>;

const JournalEntryScreen: React.FC<Props> = ({ navigation }) => {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('😊');
  const [aiPrompt, setAiPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (content.trim().length === 0) return;
    setLoading(true);
    try {
      // await createJournalEntry(content, mood);
      const promptData = await getAIPrompt(content);
      setAiPrompt(promptData.prompt);
      // navigation.goBack(); // Or navigate to a success/prompt screen
    } catch (error) {
      console.error('Failed to save entry:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>How are you feeling today?</Text>
      <MoodSelector selectedMood={mood} onSelectMood={setMood} />

      <Text style={styles.label}>What's on your mind?</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Write about your day..."
        multiline
        value={content}
        onChangeText={setContent}
      />

      <Button title="Save & Reflect" onPress={handleSave} loading={loading} />

      {aiPrompt ? (
          <View style={styles.promptContainer}>
              <Text style={styles.promptLabel}>Reflection Prompt:</Text>
              <Text style={styles.promptText}>{aiPrompt}</Text>
          </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  textInput: {
    backgroundColor: 'white',
    minHeight: 200,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  promptContainer: {
      backgroundColor: 'rgba(108, 99, 255, 0.1)',
      padding: 16,
      borderRadius: 8,
      marginTop: 20,
  },
  promptLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#6C63FF',
      marginBottom: 8,
  },
  promptText: {
      fontSize: 16,
      lineHeight: 24,
  }
});

export default JournalEntryScreen;
