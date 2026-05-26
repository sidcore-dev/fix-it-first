import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../constants/Colors";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Builder! 👋</Text>
      <Text style={styles.subtitle}>This is your Expo Go playground.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Start Here</Text>
        <Text style={styles.step}>1. Open a screen file (screen2, screen3, or screen4)</Text>
        <Text style={styles.step}>2. Read the comment at the top — it&apos;s your Claude prompt!</Text>
        <Text style={styles.step}>3. Paste Claude&apos;s code in, save, and watch it appear</Text>
      </View>

      <Text style={styles.footer}>made with ❤️ + AI</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 36,
    paddingBottom: 24,
  },
  title: {
    color: Colors.text,
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: 0.2,
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.textMuted,
    fontSize: 16,
    marginBottom: 24,
  },
  card: {
    backgroundColor: Colors.card,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    shadowColor: Colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  cardTitle: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  step: {
    color: Colors.text,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 8,
  },
  footer: {
    marginTop: "auto",
    textAlign: "center",
    color: Colors.textMuted,
    fontSize: 14,
    paddingTop: 24,
  },
});