import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import Header from "../components/Header";  

const DetailClan = () => {
  const route = useRoute();
  const { clanId, clanName } = route.params || {};
  const [clanDetails, setClanDetails] = useState(null);
  const [memberDetails, setMemberDetails] = useState([]);

  useEffect(() => {
    if (!clanId) return; 

    const fetchClanDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.wotblitz.asia/wotb/clans/info/?application_id=c2ea89d89b43f8ce20c935966c349fbb&clan_id=${clanId}`
        );
        const clanData = response.data?.data?.[clanId];
        setClanDetails(clanData);

        if (clanData?.members_ids) {
          fetchMemberDetails(clanData.members_ids);
        }
      } catch (error) {
        console.error("Failed to fetch clan details:", error);
      }
    };

    const fetchMemberDetails = async (memberIds) => {
      try {
        const response = await axios.get(
          `https://api.wotblitz.asia/wotb/account/info/?application_id=c2ea89d89b43f8ce20c935966c349fbb&account_id=${memberIds.join(",")}`
        );
        const memberData = Object.values(response.data?.data || {});
        setMemberDetails(memberData);
      } catch (error) {
        console.error("Failed to fetch member details:", error);
      }
    };

    fetchClanDetails();
  }, [clanId]);

  if (!clanId) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Invalid Clan ID</Text>
      </View>
    );
  }

  const renderMember = ({ item }) => (
    <View style={styles.memberCard}>
      <Text style={styles.memberName}>{item.nickname}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header headerText={clanName} flexPosition="center" />

      <View style={styles.detailsCard}>
        {clanDetails ? (
          <>
            <Text style={styles.detailText}>
              <Text style={styles.label}>Description:</Text>{"\n"}
              {"\"" + (clanDetails.description || "No description available") + "\""}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.label}>Leader:</Text> {clanDetails.leader_name}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.label}>Motto:</Text>{" "}
              {clanDetails.motto || "No motto available"}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.label}>Members:</Text>{" "}
              {clanDetails.members_count}
            </Text>

            {memberDetails.length > 0 ? (
              <FlatList
                data={memberDetails}
                renderItem={renderMember}
                keyExtractor={(item) => item.account_id.toString()}
                style={styles.membersList}
                contentContainerStyle={styles.membersListContainer}
              />
            ) : (
              <Text style={styles.noMembersText}>No members available.</Text>
            )}
          </>
        ) : (
          <Text style={styles.loadingText}>Loading clan details...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282C34",
    alignItems: "center",
    paddingTop: 0,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    alignItems: "center",
    marginBottom: 20,
  },
  clanName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxHeight: Dimensions.get("window").height * 0.8, 
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
    textAlign: "justify", 
  },
  label: {
    fontWeight: "bold",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  membersList: {
    marginTop: 20,
    backgroundColor: "#9c9c9c", 
    borderRadius: 20,
  },
  membersListContainer: {
    padding: 10,

  },
  memberCard: {
    backgroundColor: "#484a4a", 
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  memberName: {
    fontSize: 16,
    color: "#FFF", 
  },
  noMembersText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
});

export default DetailClan;
