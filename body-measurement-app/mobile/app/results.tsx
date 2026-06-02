import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MeasurementCard from '../components/MeasurementCard';
import {
  CATEGORY_LABELS,
  CONFIDENCE_COLORS,
  CONFIDENCE_LABELS,
  MEASUREMENT_META,
} from '../constants/measurements';
import { useApp } from '../context/AppContext';
import { MeasurementCategory } from '../types';

const CATEGORIES: MeasurementCategory[] = ['basic', 'upper', 'lower', 'arm'];

export default function ResultsScreen() {
  const { measurements, hasSideView, processingTimeMs, reset } = useApp();
  const [activeCategory, setActiveCategory] = useState<MeasurementCategory>('upper');

  if (!measurements) {
    router.replace('/');
    return null;
  }

  const measurementMap = Object.fromEntries(measurements.map(m => [m.key, m]));

  const filteredMeta = MEASUREMENT_META.filter(meta => meta.category === activeCategory);

  const handleShare = async () => {
    const lines = measurements
      .filter(m => m.value != null)
      .map(m => `${m.name_ja}: ${m.value} ${m.unit}`)
      .join('\n');
    await Share.share({ message: `AI採寸結果\n\n${lines}` });
  };

  const handleRedo = () => {
    reset();
    router.replace('/');
  };

  // Summary: high + medium confidence count
  const reliableCount = measurements.filter(
    m => m.confidence === 'high' || m.confidence === 'medium',
  ).length;

  return (
    <View style={styles.container}>
      {/* Summary banner */}
      <View style={styles.banner}>
        <View style={styles.bannerLeft}>
          <Text style={styles.bannerTitle}>採寸完了</Text>
          <Text style={styles.bannerSub}>
            {measurements.length} 項目 ／ 高精度 {reliableCount} 項目
            {hasSideView ? ' ／ 側面写真あり' : ''}
          </Text>
          {processingTimeMs && (
            <Text style={styles.bannerTime}>{(processingTimeMs / 1000).toFixed(1)}秒</Text>
          )}
        </View>
        <View style={styles.bannerRight}>
          <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
            <Text style={styles.shareBtnText}>共有</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Confidence legend */}
      <View style={styles.legend}>
        {Object.entries(CONFIDENCE_LABELS).map(([key, label]) => (
          <View key={key} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: CONFIDENCE_COLORS[key] }]} />
            <Text style={styles.legendText}>{label}</Text>
          </View>
        ))}
      </View>

      {/* Category tabs */}
      <View style={styles.tabs}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.tab, activeCategory === cat && styles.tabActive]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text style={[styles.tabText, activeCategory === cat && styles.tabTextActive]}>
              {CATEGORY_LABELS[cat]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Measurement list */}
      <ScrollView style={styles.list} contentContainerStyle={{ paddingBottom: 120 }}>
        {filteredMeta.map(meta => {
          const m = measurementMap[meta.key];
          if (!m) return null;
          return (
            <MeasurementCard
              key={meta.key}
              measurement={m}
              description={meta.description}
            />
          );
        })}
      </ScrollView>

      {/* Bottom actions */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.redoBtn} onPress={handleRedo}>
          <Text style={styles.redoBtnText}>最初からやり直す</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a' },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a2e',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#2a2a3a',
  },
  bannerLeft: {},
  bannerTitle: { color: '#fff', fontSize: 18, fontWeight: '800' },
  bannerSub: { color: '#aaa', fontSize: 12, marginTop: 2 },
  bannerTime: { color: '#555', fontSize: 11, marginTop: 1 },
  bannerRight: {},
  shareBtn: {
    backgroundColor: '#00d4aa22', borderWidth: 1, borderColor: '#00d4aa',
    borderRadius: 8, paddingHorizontal: 14, paddingVertical: 8,
  },
  shareBtnText: { color: '#00d4aa', fontWeight: '700', fontSize: 13 },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
    backgroundColor: '#131320',
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { color: '#888', fontSize: 11 },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#131320',
    paddingHorizontal: 12,
    paddingBottom: 8,
    gap: 6,
  },
  tab: {
    flex: 1, paddingVertical: 8, borderRadius: 8,
    alignItems: 'center', backgroundColor: '#1a1a2e',
  },
  tabActive: { backgroundColor: '#00d4aa22', borderWidth: 1, borderColor: '#00d4aa' },
  tabText: { color: '#666', fontSize: 12, fontWeight: '700' },
  tabTextActive: { color: '#00d4aa' },
  list: { flex: 1, paddingHorizontal: 16, paddingTop: 4 },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#0f0f1a',
    paddingHorizontal: 16, paddingVertical: 16,
    borderTopWidth: 1, borderColor: '#1a1a2e',
  },
  redoBtn: {
    borderWidth: 1, borderColor: '#333', borderRadius: 12,
    paddingVertical: 14, alignItems: 'center',
  },
  redoBtnText: { color: '#888', fontWeight: '700', fontSize: 14 },
});
