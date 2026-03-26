/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Link,
  Font,
} from "@react-pdf/renderer";

// Register fonts if needed, but standard ones are safer for initial build
// @react-pdf/renderer comes with some built-in fonts

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    color: "#334155",
    fontSize: 9,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1.5pt solid #2563EB",
    paddingBottom: 10,
    marginBottom: 15,
  },
  headerLeft: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 2,
  },
  tagline: {
    fontSize: 10,
    color: "#2563EB",
    marginBottom: 5,
  },
  contactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  contactItem: {
    fontSize: 8,
    color: "#64748B",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginLeft: 20,
    objectFit: "cover",
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#2563EB",
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottom: "1pt solid #E2E8F0",
    paddingBottom: 2,
    marginBottom: 6,
  },
  summary: {
    lineHeight: 1.4,
    marginBottom: 5,
  },
  entry: {
    marginBottom: 8,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  entryTitle: {
    fontWeight: "bold",
    fontSize: 10,
    color: "#0F172A",
  },
  entryDuration: {
    fontSize: 8.5,
    color: "#64748B",
  },
  entrySubtitle: {
    fontSize: 9,
    fontStyle: "italic",
    marginBottom: 2,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 1,
    paddingLeft: 10,
  },
  bulletDot: {
    width: 3,
    height: 3,
    backgroundColor: "#2563EB",
    borderRadius: 1.5,
    marginTop: 4,
    marginRight: 5,
  },
  bulletText: {
    flex: 1,
    lineHeight: 1.3,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 2,
  },
  skillCategory: {
    width: "48%",
    marginBottom: 5,
  },
  skillLabel: {
    fontWeight: "bold",
    fontSize: 8.5,
    color: "#0F172A",
    marginBottom: 1,
  },
  skillVal: {
    fontSize: 8.5,
    color: "#475569",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    borderTop: "0.5pt solid #E2E8F0",
    paddingTop: 5,
    fontSize: 7.5,
    color: "#94A3B8",
  },
});

export interface ResumeData {
  layout: "resume" | "cv";
  personalInfo: {
    name: string;
    tagline: string;
    email: string;
    phone: string;
    location: string;
    github?: string;
    linkedin?: string;
    portfolio?: string;
    profileImage?: string;
  };
  summary: string;
  education: Array<{
    institution: string;
    degree: string;
    duration: string;
    details?: string[];
  }>;
  experience: Array<{
    title: string;
    org: string;
    duration: string;
    bullets: string[];
  }>;
  projects: Array<{
    title: string;
    tech: string[];
    duration: string;
    bullets: string[];
    url?: string;
  }>;
  skills: Array<{
    category: string;
    items: string[];
  }>;
  achievements: Array<{
    title: string;
    date: string;
    description: string;
  }>;
}

export const ResumePDF = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.name}>{data.personalInfo.name}</Text>
          <Text style={styles.tagline}>{data.personalInfo.tagline}</Text>
          <View style={styles.contactGrid}>
            <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
            <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
            <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
            {data.personalInfo.github && <Text style={styles.contactItem}>github.com/{data.personalInfo.github}</Text>}
          </View>
        </View>
        {data.personalInfo.profileImage && (
          <Image src={data.personalInfo.profileImage} style={styles.profileImage} />
        )}
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summary}>{data.summary}</Text>
        </View>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{exp.title}</Text>
                <Text style={styles.entryDuration}>{exp.duration}</Text>
              </View>
              <Text style={styles.entrySubtitle}>{exp.org}</Text>
              {exp.bullets.map((b, bi) => (
                <View key={bi} style={styles.bullet}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.bulletText}>{b}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {data.projects.map((proj, i) => (
            <View key={i} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{proj.title} | {proj.tech.join(", ")}</Text>
                <Text style={styles.entryDuration}>{proj.duration}</Text>
              </View>
              {proj.bullets.map((b, bi) => (
                <View key={bi} style={styles.bullet}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.bulletText}>{b}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{edu.degree}</Text>
                <Text style={styles.entryDuration}>{edu.duration}</Text>
              </View>
              <Text style={styles.entrySubtitle}>{edu.institution}</Text>
              {edu.details?.map((d, di) => (
                <View key={di} style={styles.bullet}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.bulletText}>{d}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <View style={styles.skillsGrid}>
            {data.skills.map((skill, i) => (
              <View key={i} style={styles.skillCategory}>
                <Text style={styles.skillLabel}>{skill.category}</Text>
                <Text style={styles.skillVal}>{skill.items.join(", ")}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Achievements */}
      {data.achievements.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {data.achievements.map((ach, i) => (
            <View key={i} style={styles.entry}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{ach.title}</Text>
                <Text style={styles.entryDuration}>{ach.date}</Text>
              </View>
              <Text style={styles.summary}>{ach.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <Text>References available upon request | {data.personalInfo.portfolio}</Text>
      </View>
    </Page>
  </Document>
);
