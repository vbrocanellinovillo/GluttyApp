import { StyleSheet, View } from "react-native";
import SectionContainer from "../SectionContainer";
import { Skeleton } from "@rneui/themed";

export default function MedicalStatisticsSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.firstSection}>
        <SectionContainer style={styles.studies}>
          <Skeleton width={120} height={20} />
          <Skeleton width={70} height={20} />
          <Skeleton width={40} height={40} />
        </SectionContainer>
        <SectionContainer style={styles.tips}>
          <Skeleton width={90} height={20} />
          <View style={styles.tipsSection}>
            <Skeleton width={100} height={20} />
            <Skeleton width={40} height={30} />
          </View>
        </SectionContainer>
      </View>
      <SectionContainer style={styles.statistics}>
        <Skeleton width={100} height={20} />
        <Skeleton height={26} />
        <Skeleton height={160} />
        <View style={styles.statsFreqs}>
          <Skeleton width={50} height={20} />
          <Skeleton width={50} height={20} />
          <Skeleton width={50} height={20} />
          <Skeleton width={50} height={20} />
        </View>
      </SectionContainer>
      <SectionContainer style={styles.nextStudy}>
        <Skeleton height={20} />
        <View style={styles.time}>
          <View style={styles.timeItem}>
            <Skeleton width={50} height={50} />
            <Skeleton />
          </View>
          <View style={styles.timeItem}>
            <Skeleton width={50} height={50} />
            <Skeleton />
          </View>
          <View style={styles.timeItem}>
            <Skeleton width={50} height={50} />
            <Skeleton />
          </View>
        </View>
      </SectionContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 10,
    gap: 30,
  },

  firstSection: {
    flexDirection: "row",
    gap: 20,
  },

  studies: {
    gap: 10,
  },

  tips: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingBottom: 24,
  },

  tipsSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  statistics: {
    alignItems: "flex-start",
    gap: 16,
  },

  statsFreqs: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
  },

  nextStudy: {
    gap: 14,
  },

  time: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 14,
  },

  timeItem: {
    gap: 8,
  },
});
