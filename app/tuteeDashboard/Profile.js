import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#003366"
          style={styles.backButton}
          onPress={() => router.back()}
        />
        <Text style={styles.title}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
       
        <View style={styles.profileSection}>
          <Image
            source={require('../pics/profile.jpg')}
            style={styles.profileImage}
          />
          <Text style={styles.name}>Antonio C. Soldevillo</Text>
          <Text style={styles.email}>antonio.soldevillo@example.com</Text>
        </View>

      
        <View style={styles.bioSection}>
          <Text style={styles.bioTitle}>Bio</Text>
          <Text style={styles.bioText}>
            Antonio is a dedicated student pursuing a degree in Computer Science. With a keen interest in programming and artificial intelligence, he is constantly seeking opportunities to expand his knowledge and skills. Outside of academics, Antonio enjoys playing chess and hiking.
          </Text>
        </View>

        
        <View style={styles.sessionsSection}>
          <Text style={styles.sessionsTitle}>Upcoming Sessions</Text>
          <Text style={styles.sessionItem}>Math 101 - 12/12/2024 - 10:00 AM</Text>
          <Text style={styles.sessionItem}>Physics 102 - 12/14/2024 - 2:00 PM</Text>
        </View>

      
        <View style={styles.ratingsSection}>
          <Text style={styles.ratingsTitle}>Ratings</Text>
          <Text style={styles.ratingsText}>4.5/5 (Based on 10 reviews)</Text>
        </View>

        
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Tutee Information</Text>
          <Text style={styles.infoItem}>Enrolled Subjects: 5</Text>
          <Text style={styles.infoItem}>Sessions Booked: 12</Text>
          <Text style={styles.infoItem}>Completed Sessions: 10</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    flex:1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    textAlign:'center',
    marginLeft:-28
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    paddingBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#003366',
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
  },
  email: {
    fontSize: 16,
    color: '#808080',
  },
  bioSection: {
    padding: 20,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginBottom: 20,
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
  bioText: {
    fontSize: 16,
    color: '#003366',
    lineHeight: 24,
  },
  sessionsSection: {
    padding: 20,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginBottom: 20,
  },
  sessionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
  sessionItem: {
    fontSize: 16,
    color: '#003366',
    marginBottom: 10,
  },
  ratingsSection: {
    padding: 20,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginBottom: 20,
  },
  ratingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
  ratingsText: {
    fontSize: 16,
    color: '#003366',
  },
  infoSection: {
    padding: 20,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 15,
  },
  infoItem: {
    fontSize: 16,
    color: '#003366',
    marginBottom: 10,
  },
  scrollContainer: {
    paddingBottom: 100, 
  },
});
