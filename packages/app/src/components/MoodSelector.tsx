import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const MOODS = ['😊', '😐', '😔', '😠', '😍'];

interface MoodSelectorProps {
  selectedMood: string;
  onSelectMood: (mood: string) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onSelectMood }) => {
  return (
    <View style={styles.container}>
      {MOODS.map((mood) => (
        <TouchableOpacity
          key={mood}
          style={[styles.mood, selectedMood === mood && styles.selected]}
          onPress={() => onSelectMood(mood)}
        >
          <Text style={styles.emoji}>{mood}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
  },
  mood: {
    padding: 10,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selected: {
    borderColor: '#6C63FF',
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
  },
  emoji: {
    fontSize: 30,
  },
});

export default MoodSelector;
