
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { supabase } from "../Lib/supabase";

type Announcement = {
  id: number;
  title: string;
  description: string;
};

export default function SupabaseTest() {
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function testConnection() {
      try {
        const { data, error } = await supabase
          .from("announcements")
          .select("*");

        if (error) {
          throw error;
        }

        setAnnouncements(data ?? []);
        setConnected(true);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unknown error";

        setError(message);
        console.error("Supabase connection failed:", err);
      } finally {
        setLoading(false);
      }
    }

    testConnection();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Supabase Connection Test</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : connected ? (
        <>
          <Text style={styles.success}>
            Connection Successful!
          </Text>

          <Text>
            Retrieved {announcements.length} announcements.
          </Text>

          {announcements.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.heading}>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          ))}
        </>
      ) : (
        <Text style={styles.error}>
          Connection Failed: {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
  },
  success: {
    color: "green",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  error: {
    color: "red",
    fontSize: 16,
  },
  card: {
    padding: 15,
    marginTop: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 17,
  },
});
