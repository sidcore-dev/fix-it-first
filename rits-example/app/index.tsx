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

const partnerLogos = ["NASA", "VCU", "DEIC", "IEEE", "NSF"];
const tracks = ["Computer Vision", "BioMedical Sports", "Vibe Coding"];

const gallery = [
  {
    title: "Classroom Session",
    subtitle: "Hands-on AI workshop",
    uri: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Campus Community",
    subtitle: "Team collaboration and demos",
    uri: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Future Engineers",
    subtitle: "Mentor-led project building",
    uri: "https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [energy, setEnergy] = useState(2);

  const vibeLabel = useMemo(() => {
    if (energy <= 1) return "Explorer Mode";
    if (energy <= 3) return "Builder Mode";
    return "Launch Mode";
  }, [energy]);

  const activeImage = gallery[selectedImage];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.navBarCard}>
        <View style={styles.logoWrap}>
          <View style={styles.logoIcon}>
            <Ionicons name="school-outline" size={18} color={Colors.primary} />
          </View>
          <Text style={styles.logoText}>RITS</Text>
        </View>
        <Pressable style={styles.registerBtn} onPress={() => router.push("/contact") }>
          <Text style={styles.registerBtnText}>REGISTER</Text>
        </Pressable>
      </View>

      <View style={styles.heroCard}>
        <Text style={styles.kicker}>LEARN AI IN YOUR CITY</Text>
        <Text style={styles.heroTitle}>Inspiring Future Engineers</Text>
        <Text style={styles.heroBody}>
          STEM Summer Camps in Richmond, VA. Build real projects in AI,
          robotics, computer vision, and app development with industry mentors.
        </Text>

        <View style={styles.heroActionsRow}>
          <Pressable style={styles.primaryButton} onPress={() => router.push("/events") }>
            <Text style={styles.primaryButtonText}>SUMMER CAMP</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={() => router.push("/programs") }>
            <Text style={styles.secondaryButtonText}>ONLINE PROGRAMS</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.partnerRow}>
        {partnerLogos.map((logo) => (
          <View key={logo} style={styles.partnerPill}>
            <Text style={styles.partnerText}>{logo}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.imageCard}>
        <Image source={{ uri: activeImage.uri }} style={styles.heroImage} />
        <View style={styles.imageCaption}>
          <Text style={styles.imageTitle}>{activeImage.title}</Text>
          <Text style={styles.imageSub}>{activeImage.subtitle}</Text>
        </View>
      </View>

      <View style={styles.imageSelectorRow}>
        {gallery.map((item, index) => (
          <Pressable
            key={item.title}
            onPress={() => setSelectedImage(index)}
            style={[
              styles.selectorDot,
              index === selectedImage && styles.selectorDotActive,
            ]}
          />
        ))}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Pick Your Camp Concentration</Text>
        <View style={styles.trackWrap}>
          {tracks.map((track) => {
            const isActive = track === selectedTrack;
            return (
              <Pressable
                key={track}
                onPress={() => setSelectedTrack(track)}
                style={[styles.trackChip, isActive && styles.trackChipActive]}
              >
                <Text style={[styles.trackChipText, isActive && styles.trackChipTextActive]}>
                  {track}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <Text style={styles.trackResult}>Current focus: {selectedTrack}</Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Camp Energy Meter</Text>
        <Text style={styles.energyLabel}>{vibeLabel}</Text>
        <View style={styles.energyRow}>
          {[1, 2, 3, 4, 5].map((value) => (
            <Pressable
              key={value}
              style={[styles.energyNode, value <= energy && styles.energyNodeActive]}
              onPress={() => setEnergy(value)}
            />
          ))}
        </View>
        <Text style={styles.energyHint}>Tap to set your excitement level for Summer 2026.</Text>
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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  navBarCard: {
    backgroundColor: Colors.card,
    borderColor: Colors.cardBorder,
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  logoWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIcon: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: "#E6F0FB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  logoText: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  registerBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  registerBtnText: {
    color: Colors.accent,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  heroCard: {
    backgroundColor: "#1D4F7A",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  kicker: {
    color: "#D8E8F7",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 8,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 29,
    lineHeight: 34,
    fontWeight: "800",
    marginBottom: 8,
  },
  heroBody: {
    color: "#E8F1FA",
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 14,
  },
  heroActionsRow: {
    flexDirection: "row",
    gap: 8,
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  primaryButtonText: {
    color: "#144C7B",
    fontSize: 12,
    fontWeight: "800",
  },
  secondaryButton: {
    borderColor: "#C7DDF4",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  partnerRow: {
    gap: 8,
    paddingBottom: 12,
  },
  partnerPill: {
    backgroundColor: Colors.card,
    borderColor: Colors.cardBorder,
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  partnerText: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: "700",
  },
  imageCard: {
    backgroundColor: Colors.card,
    borderColor: Colors.cardBorder,
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 10,
  },
  heroImage: {
    width: "100%",
    height: 190,
    backgroundColor: "#CED7E2",
  },
  imageCaption: {
    padding: 12,
  },
  imageTitle: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 2,
  },
  imageSub: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  imageSelectorRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
    gap: 8,
  },
  selectorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#C1CBD8",
  },
  selectorDotActive: {
    width: 18,
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },
  sectionCard: {
    backgroundColor: Colors.card,
    borderColor: Colors.cardBorder,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  trackWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  trackChip: {
    backgroundColor: "#EFF4F9",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  trackChipActive: {
    backgroundColor: Colors.primary,
  },
  trackChipText: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: "600",
  },
  trackChipTextActive: {
    color: "#FFFFFF",
  },
  trackResult: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  energyLabel: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },
  energyRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  energyNode: {
    width: 28,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D4DFEA",
  },
  energyNodeActive: {
    backgroundColor: Colors.primary,
  },
  energyHint: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
});