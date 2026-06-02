import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const GUIDE_W = width * 0.38;
const GUIDE_H = height * 0.65;

interface Props {
  mode: 'front' | 'side';
}

export default function CameraGuide({ mode }: Props) {
  return (
    <View style={styles.container} pointerEvents="none">
      {/* Silhouette outline */}
      <View style={styles.silhouette}>
        {/* Head */}
        <View style={styles.head} />
        {/* Body */}
        <View style={styles.body} />
        {/* Legs */}
        <View style={styles.legs} />
      </View>

      {/* Corner markers */}
      <View style={[styles.corner, styles.topLeft]} />
      <View style={[styles.corner, styles.topRight]} />
      <View style={[styles.corner, styles.bottomLeft]} />
      <View style={[styles.corner, styles.bottomRight]} />

      {/* Instruction text */}
      <View style={styles.instructionBox}>
        <Text style={styles.instructionText}>
          {mode === 'front'
            ? '全身が枠内に収まるよう\n約2m離れて正面を向いて立ってください'
            : '横向きに立ち\n全身が枠内に収まるようにしてください'}
        </Text>
        <Text style={styles.subText}>
          腕は体から少し離してください
        </Text>
      </View>

      {/* Center line for side view */}
      {mode === 'side' && <View style={styles.centerLine} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  silhouette: {
    width: GUIDE_W,
    height: GUIDE_H,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 12,
    alignItems: 'center',
    paddingTop: 8,
    gap: 0,
  },
  head: {
    width: GUIDE_W * 0.28,
    height: GUIDE_W * 0.28,
    borderRadius: GUIDE_W * 0.14,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    marginTop: 8,
  },
  body: {
    width: GUIDE_W * 0.55,
    height: GUIDE_H * 0.35,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 6,
    marginTop: 4,
  },
  legs: {
    width: GUIDE_W * 0.55,
    height: GUIDE_H * 0.40,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 6,
    marginTop: 2,
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#00d4aa',
    borderWidth: 3,
  },
  topLeft: {
    top: (height - GUIDE_H) / 2 - 1,
    left: (width - GUIDE_W) / 2 - 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 4,
  },
  topRight: {
    top: (height - GUIDE_H) / 2 - 1,
    right: (width - GUIDE_W) / 2 - 1,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 4,
  },
  bottomLeft: {
    bottom: (height - GUIDE_H) / 2 - 1,
    left: (width - GUIDE_W) / 2 - 1,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 4,
  },
  bottomRight: {
    bottom: (height - GUIDE_H) / 2 - 1,
    right: (width - GUIDE_W) / 2 - 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 4,
  },
  instructionBox: {
    position: 'absolute',
    bottom: 120,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  instructionText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '600',
  },
  subText: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  centerLine: {
    position: 'absolute',
    top: (height - GUIDE_H) / 2,
    bottom: (height - GUIDE_H) / 2,
    left: width / 2,
    width: 1,
    backgroundColor: 'rgba(0, 212, 170, 0.4)',
  },
});
