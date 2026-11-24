import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useUserAuth } from "../../Context/Auth-context";

export default function ProtectedHomeScreen() {
  const { user, signOut } = useUserAuth();

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSignOut() {
    setSubmitting(true);
    setErrorMessage("");

    try {
      const { error } = await signOut();

      if (error) {
        setErrorMessage(error.message);
      }
    } catch {
      setErrorMessage("Unable to sign out. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>

      <Text style={styles.subtitle}>
        You have successfully signed in.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Signed-in account</Text>

        <Text style={styles.email}>
          {user?.email ?? "No email available"}
        </Text>
      </View>

      {errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text>
      ) : null}

      <Pressable
        style={styles.button}
        onPress={handleSignOut}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Sign Out</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#222222",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 32,
    textAlign: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#dddddd",
  },
  label: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  email: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222222",
  },
  button: {
    width: "100%",
    backgroundColor: "#dc2626",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "#d32f2f",
    marginBottom: 12,
    textAlign: "center",
  },
});
