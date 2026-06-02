import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, StyleSheet, Text, View } from 'react-native';
import { estimateMeasurements } from '../services/api';
import { useApp } from '../context/AppContext';

const STEPS = [
  '写真をアップロード中...',
  '人物を検出中...',
  '骨格ランドマークを解析中...',
  '21項目の寸法を計算中...',
  'データを整理しています...',
];

export default function ProcessingScreen() {
  const { photos, userInput, setResults } = useApp();
  const [stepIndex, setStepIndex] = useState(0);
  const [done, setDone] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Spinning animation
    Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: 1200, useNativeDriver: true }),
    ).start();

    // Step progress animation
    const stepTimer = setInterval(() => {
      setStepIndex(i => Math.min(i + 1, STEPS.length - 1));
    }, 1000);

    // Progress bar animation
    Animated.timing(progress, {
      toValue: 1, duration: STEPS.length * 1000, useNativeDriver: false,
    }).start();

    // Actual API call
    runEstimation().finally(() => clearInterval(stepTimer));

    return () => clearInterval(stepTimer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runEstimation = async () => {
    if (!photos.frontUri) {
      Alert.alert('エラー', '正面写真が見つかりません');
      router.back();
      return;
    }

    const heightCm = parseFloat(userInput.height);
    const weightKg = userInput.weight ? parseFloat(userInput.weight) : undefined;
    const footSizeCm = userInput.footSize ? parseFloat(userInput.footSize) : undefined;

    try {
      const response = await estimateMeasurements({
        frontImageUri: photos.frontUri,
        sideImageUri: photos.sideUri,
        heightCm,
        weightKg,
        gender: userInput.gender,
        footSizeCm,
      });

      setResults(response.measurements, response.has_side_view, response.processing_time_ms);
      setDone(true);

      setTimeout(() => router.replace('/results'), 600);
    } catch (e: unknown) {
      Alert.alert(
        '解析エラー',
        e instanceof Error ? e.message : '解析中にエラーが発生しました。\n写真を撮り直してください。',
        [{ text: 'やり直す', onPress: () => router.replace('/') }],
      );
    }
  };

  const spinInterpolate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', done ? '100%' : '90%'],
  });

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[styles.spinner, { transform: [{ rotate: spinInterpolate }] }]}
      >
        ◎
      </Animated.Text>

      <Text style={styles.title}>AIが採寸中</Text>
      <Text style={styles.step}>{STEPS[stepIndex]}</Text>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
      </View>

      <Text style={styles.hint}>
        全身写真から 21 項目を推定しています{'\n'}
        しばらくお待ちください
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#0f0f1a',
    alignItems: 'center', justifyContent: 'center', padding: 32,
  },
  spinner: {
    fontSize: 64, color: '#00d4aa', marginBottom: 32,
  },
  title: {
    fontSize: 24, fontWeight: '800', color: '#fff', marginBottom: 12,
  },
  step: {
    fontSize: 14, color: '#00d4aa', marginBottom: 24,
  },
  progressTrack: {
    width: '100%', height: 6, backgroundColor: '#1a1a2e',
    borderRadius: 3, overflow: 'hidden', marginBottom: 32,
  },
  progressFill: {
    height: '100%', backgroundColor: '#00d4aa', borderRadius: 3,
  },
  hint: {
    fontSize: 13, color: '#666', textAlign: 'center', lineHeight: 20,
  },
});
