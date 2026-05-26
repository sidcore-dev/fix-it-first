import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Colors } from "../constants/Colors";

const concentrations = [
  {
    id: "cv",
    title: "Computer Vision",
    fee: 600,
    details: "Train image models, detect objects, and build camera-based apps.",
    icon: "scan-outline",
  },
  {
    id: "bio",
    title: "BioMedical Sports Science",
    fee: 600,
    details: "Explore AI for biomechanics, performance, and movement analysis.",
    icon: "fitness-outline",
  },
  {
    id: "vibe",
    title: "CS and Vibe Coding",
    fee: 600,
    details: "Build practical apps and tools with modern coding workflows.",
    icon: "code-slash-outline",
  },
];

export default function ProgramsScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(["cv"]);
  const [showBrochure, setShowBrochure] = useState(false);

  const total = useMemo(
    () => concentrations.filter((c) => selected.includes(c.id)).reduce((sum, c) => sum + c.fee, 0),
    [selected],
  );

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.heroKicker}>AI SUMMER CAMP 2026</Text>
        <Text style={styles.heroTitle}>AI Camp Concentrations</Text>
        <Text style={styles.heroBody}>
          Tap any concentration to build your custom learning path for the week.
        </Text>
        <Pressable style={styles.heroAction} onPress={() => setShowBrochure((v) => !v)}>
          <Text style={styles.heroActionText}>{showBrochure ? "Hide" : "Camp Brochure"}</Text>
        </Pressable>
      </View>

      {showBrochure ? (
        <View style={styles.brochureCard}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80" }}
            style={styles.brochureImage}
          />
          <Text style={styles.brochureText}>
            Hosted at VCU College of Engineering | July 20-24, 2026 | 9:00 AM - 5:00 PM
          </Text>
        </View>
      ) : null}

      {concentrations.map((item) => {
        const isActive = selected.includes(item.id);
        return (
          <Pressable
            key={item.id}
            style={[styles.concentrationCard, isActive && styles.concentrationCardActive]}
            onPress={() => toggle(item.id)}
          >
            <View style={styles.cardTop}>
              <View style={styles.iconWrap}>
                <Ionicons
                  name={item.icon as keyof typeof Ionicons.glyphMap}
                  size={18}
                  color={isActive ? "#FFFFFF" : Colors.primary}
                />
              </View>
              <View style={styles.cardTitleWrap}>
                <Text style={[styles.cardTitle, isActive && styles.cardTitleActive]}>{item.title}</Text>
                <Text style={[styles.cardFee, isActive && styles.cardFeeActive]}>${item.fee}</Text>
              </View>
              <Ionicons
                name={isActive ? "checkbox" : "square-outline"}
                size={20}
                color={isActive ? "#FFFFFF" : Colors.primary}
              />
            </View>
            <Text style={[styles.cardDetails, isActive && styles.cardDetailsActive]}>{item.details}</Text>
          </Pressable>
        );
      })}

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Your Selected Path</Text>
        <Text style={styles.summaryLine}>Tracks selected: {selected.length}</Text>
        <Text style={styles.summaryLine}>Estimated total: ${total}</Text>
        <Pressable style={styles.summaryBtn} onPress={() => router.push("/contact") }>
          <Text style={styles.summaryBtnText}>REGISTER NOW</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 26,
  },
  heroCard: {
    backgroundColor: "#0F4B7A",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  heroKicker: {
    color: "#D2E7FA",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "800",
    marginBottom: 6,
  },
  heroBody: {
    color: "#EAF4FD",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 12,
  },
  heroAction: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  heroActionText: {
    color: "#0F4B7A",
    fontSize: 12,
    fontWeight: "800",
  },
  brochureCard: {
    backgroundColor: Colors.card,
    borderColor: Colors.cardBorder,
    borderWidth: 1,
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 12,
  },
  brochureImage: {
    width: "100%",
    height: 150,
    backgroundColor: "#D6DEE8",
  },
  brochureText: {
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    padding: 12,
  },
  concentrationCard: {
    backgroundColor: Colors.card,
    borderColor: Colors.cardBorder,
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  concentrationCardActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#E7F1FB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  cardTitleWrap: {
    flex: 1,
  },
  cardTitle: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
  },
  cardTitleActive: {
    color: "#FFFFFF",
  },
  cardFee: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 2,
  },
  cardFeeActive: {
    color: "#DDEEFF",
  },
  cardDetails: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 8,
  },
  cardDetailsActive: {
    color: "#EEF6FF",
  },
  summaryCard: {
    backgroundColor: Colors.card,
    borderColor: Colors.cardBorder,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginTop: 4,
  },
  summaryTitle: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 6,
  },
  summaryLine: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginBottom: 3,
  },
  summaryBtn: {
    marginTop: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 11,
  },
  summaryBtnText: {
    color: Colors.accent,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
});