import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

import { Colors } from "../constants/Colors";

export default function ContactScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribe, setSubscribe] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const emailValid = useMemo(() => /\S+@\S+\.\S+/.test(email), [email]);
  const canSubmit = firstName.trim().length > 0 && lastName.trim().length > 0 && emailValid;

  const onSubmit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Join RITS Summer Camp</Text>
        <Text style={styles.heroBody}>
          For more information, reach out to us at team@ritsva.com
        </Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Download Our Camp Brochure</Text>

        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First name"
          style={styles.input}
          placeholderTextColor={Colors.textSecondary}
        />
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last name"
          style={styles.input}
          placeholderTextColor={Colors.textSecondary}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={Colors.textSecondary}
        />

        <View style={styles.subscribeRow}>
          <View style={styles.subscribeTextWrap}>
            <Text style={styles.subscribeTitle}>Subscribe to mailing list</Text>
            <Text style={styles.subscribeHint}>Get updates for camp seats and special events.</Text>
          </View>
          <Switch
            value={subscribe}
            onValueChange={setSubscribe}
            trackColor={{ false: "#C6D0DC", true: "#7CB8F1" }}
            thumbColor={subscribe ? Colors.primary : "#F0F2F4"}
          />
        </View>

        {!emailValid && email.length > 0 ? (
          <Text style={styles.errorText}>Please enter a valid email address.</Text>
        ) : null}

        <Pressable
          style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
          onPress={onSubmit}
        >
          <Text style={styles.submitButtonText}>{submitted ? "SUBSCRIBED" : "SUBSCRIBE"}</Text>
        </Pressable>

        {submitted ? (
          <Text style={styles.successText}>
            Thanks, {firstName}. Your request is in and we will email the brochure shortly.
          </Text>
        ) : null}
      </View>

      <View style={styles.quickCard}>
        <Text style={styles.quickTitle}>Contact</Text>

        <Pressable
          style={styles.quickRow}
          onPress={() => Linking.openURL("mailto:team@ritsva.com")}
        >
          <Ionicons name="mail-outline" size={17} color={Colors.primary} />
          <Text style={styles.quickText}>team@ritsva.com</Text>
        </Pressable>

        <Pressable
          style={styles.quickRow}
          onPress={() => Linking.openURL("https://ritsva.com")}
        >
          <Ionicons name="globe-outline" size={17} color={Colors.primary} />
          <Text style={styles.quickText}>ritsva.com</Text>
        </Pressable>

        <View style={styles.socialRow}>
          <Pressable style={styles.socialBtn}>
            <Ionicons name="logo-facebook" size={18} color={Colors.primary} />
          </Pressable>
          <Pressable style={styles.socialBtn}>
            <Ionicons name="logo-youtube" size={18} color={Colors.primary} />
          </Pressable>
          <Pressable style={styles.socialBtn}>
            <Ionicons name="logo-instagram" size={18} color={Colors.primary} />
          </Pressable>
        </View>
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
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 6,
  },
  heroBody: {
    color: "#E6F3FE",
    fontSize: 13,
    lineHeight: 19,
  },
  formCard: {
    backgroundColor: Colors.card,
    borderColor: Colors.cardBorder,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  formTitle: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderRadius: 10,
    height: 44,
    paddingHorizontal: 12,
    color: Colors.textPrimary,
    marginBottom: 9,
    backgroundColor: "#FBFCFD",
  },
  subscribeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
    marginBottom: 8,
  },
  subscribeTextWrap: {
    flex: 1,
    paddingRight: 12,
  },
  subscribeTitle: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
  },
  subscribeHint: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 1,
  },
  errorText: {
    color: "#C43131",
    fontSize: 12,
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 11,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: Colors.accent,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  successText: {
    color: "#1C6A30",
    fontSize: 12,
    marginTop: 10,
    lineHeight: 18,
  },
  quickCard: {
    backgroundColor: Colors.card,
    borderColor: Colors.cardBorder,
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
  },
  quickTitle: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  quickRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
  },
  quickText: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginLeft: 8,
  },
  socialRow: {
    flexDirection: "row",
    marginTop: 8,
    gap: 8,
  },
  socialBtn: {
    borderColor: Colors.cardBorder,
    borderWidth: 1,
    backgroundColor: "#F3F7FB",
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
});