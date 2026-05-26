import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Colors } from "../constants/Colors";

const highlights = [
  "Build AI and robotics projects",
  "Guest sessions from VCU faculty",
  "Final project demo with mentors",
];

const schedule = [
  { time: "9:00 AM", item: "Students Arrive" },
  { time: "9:30 AM", item: "Intro to Mechanical Systems" },
  { time: "10:30 AM", item: "3D Printing Workshop" },
  { time: "12:00 PM", item: "Lunch" },
  { time: "1:00 PM", item: "Guest Speaker" },
  { time: "2:00 PM", item: "Intro to Robotics" },
  { time: "3:30 PM", item: "Case Exercise" },
  { time: "5:00 PM", item: "Student Pick Up" },
];

export default function EventsScreen() {
  const [joined, setJoined] = useState(false);
  const [showSchedule, setShowSchedule] = useState(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.heroKicker}>STEM Programs For Teens</Text>
        <Text style={styles.heroTitle}>RITS 2026 Summer Camp</Text>
        <Text style={styles.heroBody}>
          Monday to Friday | July 20th to July 24th, 2026 | 9:00 AM - 5:00 PM
        </Text>
        <Text style={styles.heroBody}>$495 includes lunch and snacks</Text>
        <Pressable
          style={[styles.joinBtn, joined && styles.joinBtnJoined]}
          onPress={() => setJoined((v) => !v)}
        >
          <Text style={styles.joinBtnText}>{joined ? "REGISTERED" : "REGISTER NOW"}</Text>
        </Pressable>
      </View>

      <Image
        source={{ uri: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" }}
        style={styles.heroImage}
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>During the Camp, Students Will:</Text>
        {highlights.map((line) => (
          <View key={line} style={styles.highlightRow}>
            <Ionicons name="sparkles-outline" size={15} color={Colors.primary} />
            <Text style={styles.highlightText}>{line}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Pressable style={styles.scheduleHeader} onPress={() => setShowSchedule((v) => !v)}>
          <Text style={styles.cardTitle}>Schedule Example</Text>
          <Ionicons
            name={showSchedule ? "chevron-up-outline" : "chevron-down-outline"}
            size={18}
            color={Colors.textPrimary}
          />
        </Pressable>

        {showSchedule
          ? schedule.map((slot) => (
              <View key={slot.time + slot.item} style={styles.scheduleRow}>
                <Text style={styles.scheduleTime}>{slot.time}</Text>
                <Text style={styles.scheduleItem}>{slot.item}</Text>
              </View>
            ))
          : null}
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
    paddingBottom: 24,
  },
  heroCard: {
    backgroundColor: "#124A74",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  heroKicker: {
    color: "#D0E8FC",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginBottom: 5,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
  },
  heroBody: {
    color: "#E7F3FF",
    fontSize: 13,
    lineHeight: 20,
  },
  joinBtn: {
    marginTop: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 11,
  },
  joinBtnJoined: {
    backgroundColor: "#2B7ED0",
  },
  joinBtnText: {
    color: "#114A74",
    fontSize: 12,
    fontWeight: "800",
  },
  heroImage: {
    width: "100%",
    height: 170,
    borderRadius: 14,
    backgroundColor: "#CBD7E4",
    marginBottom: 12,
  },
  card: {
    backgroundColor: Colors.card,
    borderColor: Colors.cardBorder,
    borderWidth: 1,
    borderRadius: 14,
    padding: 13,
    marginBottom: 10,
  },
  cardTitle: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  highlightRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  highlightText: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginLeft: 8,
    flex: 1,
  },
  scheduleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  scheduleRow: {
    borderTopColor: Colors.cardBorder,
    borderTopWidth: 1,
    paddingTop: 8,
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  scheduleTime: {
    width: 88,
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "700",
  },
  scheduleItem: {
    color: Colors.textSecondary,
    fontSize: 13,
    flex: 1,
  },
});