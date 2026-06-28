import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Svg, { Path, Ellipse } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const GUIDE_W = width * 0.42;
const GUIDE_H = height * 0.68;

interface Props {
  mode: 'front' | 'side';
}

// Natural front-view human silhouette path (normalized 0-100 viewBox)
const FRONT_PATH = `
  M 50 3
  C 42 3, 36 9, 36 17
  C 36 25, 42 31, 50 31
  C 58 31, 64 25, 64 17
  C 64 9, 58 3, 50 3 Z

  M 38 33
  C 30 35, 24 40, 22 47
  L 18 62
  C 16 68, 18 72, 22 73
  L 26 74
  L 24 88
  C 23 92, 25 95, 29 95
  C 33 95, 35 92, 35 88
  L 36 74
  L 50 76
  L 64 74
  L 65 88
  C 65 92, 67 95, 71 95
  C 75 95, 77 92, 76 88
  L 74 74
  L 78 73
  C 82 72, 84 68, 82 62
  L 78 47
  C 76 40, 70 35, 62 33
  C 58 32, 55 31.5, 50 31.5
  C 45 31.5, 42 32, 38 33 Z

  M 22 73
  L 12 78
  C 8 80, 6 84, 8 88
  L 14 97
  C 16 100, 20 99, 21 96
  L 26 74
  Z

  M 78 73
  L 88 78
  C 92 80, 94 84, 92 88
  L 86 97
  C 84 100, 80 99, 79 96
  L 74 74
  Z
`;

// Natural side-view human silhouette path (normalized 0-100 viewBox)
const SIDE_PATH = `
  M 52 3
  C 44 3, 38 9, 38 17
  C 38 25, 44 31, 52 31
  C 60 31, 66 25, 66 17
  C 66 9, 60 3, 52 3 Z

  M 48 32
  C 40 34, 34 40, 33 48
  L 30 65
  C 29 70, 31 74, 36 75
  L 38 75
  L 37 88
  C 36 93, 38 96, 42 96
  C 46 96, 48 93, 48 88
  L 49 75
  L 56 75
  L 57 88
  C 57 93, 59 96, 63 96
  C 67 96, 69 93, 68 88
  L 67 75
  L 70 74
  C 74 72, 76 68, 74 62
  L 70 46
  C 68 39, 62 34, 54 32
  C 52 31.5, 50 31.5, 48 32 Z

  M 48 32
  C 44 33, 38 36, 34 40
  L 28 55
  C 26 59, 27 62, 30 63
  L 33 63
  L 30 65
  Z
`;

function FrontSilhouette({ w, h }: { w: number; h: number }) {
  return (
    <Svg width={w} height={h} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      {/* Head */}
      <Ellipse
        cx="50" cy="11"
        rx="13" ry="12"
        fill="none"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="2"
      />
      {/* Neck */}
      <Path
        d="M 44 22 L 44 28 C 44 30 46 31 50 31 C 54 31 56 30 56 28 L 56 22"
        fill="none"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Shoulders & torso */}
      <Path
        d="M 44 28 C 38 29 30 34 27 42 L 25 55 L 25 70 C 25 74 28 76 33 76 L 38 76 L 38 92 C 38 96 41 98 45 97 C 49 96 50 93 50 90 L 50 76 L 50 76 L 50 90 C 50 93 51 96 55 97 C 59 98 62 96 62 92 L 62 76 L 67 76 C 72 76 75 74 75 70 L 75 55 L 73 42 C 70 34 62 29 56 28 C 54 28 52 28 50 28 C 48 28 46 28 44 28 Z"
        fill="none"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Left arm */}
      <Path
        d="M 27 42 L 18 60 C 16 65 17 70 20 72 L 23 73 C 20 68 21 63 24 55 Z"
        fill="none"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Right arm */}
      <Path
        d="M 73 42 L 82 60 C 84 65 83 70 80 72 L 77 73 C 80 68 79 63 76 55 Z"
        fill="none"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function SideSilhouette({ w, h }: { w: number; h: number }) {
  return (
    <Svg width={w} height={h} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      {/* Head */}
      <Ellipse
        cx="52" cy="11"
        rx="12" ry="12"
        fill="none"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="2"
      />
      {/* Neck */}
      <Path
        d="M 47 22 L 46 28 C 46 30 48 31 52 31 C 56 31 57 30 57 28 L 57 23"
        fill="none"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Torso side view (slight chest/belly curve) */}
      <Path
        d="M 46 28 C 40 30 34 36 32 44 L 30 58 C 30 65 33 72 38 74 L 40 74 L 40 90 C 40 95 43 98 47 97 C 51 96 52 93 52 89 L 52 74 L 58 74 L 58 90 C 58 95 61 98 65 97 C 69 96 70 93 70 89 L 70 73 C 74 71 76 66 75 58 L 72 44 C 70 36 64 30 57 28 C 55 27 53 27 52 27 C 50 27 48 27 46 28 Z"
        fill="none"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Arm (side view - one visible arm slightly in front) */}
      <Path
        d="M 32 44 L 24 60 C 22 65 23 70 27 72 L 30 73 C 27 68 27 62 30 55 Z"
        fill="none"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function CameraGuide({ mode }: Props) {
  return (
    <View style={styles.container} pointerEvents="none">
      {/* SVG silhouette */}
      <View style={styles.silhouetteWrapper}>
        {mode === 'front'
          ? <FrontSilhouette w={GUIDE_W} h={GUIDE_H} />
          : <SideSilhouette w={GUIDE_W} h={GUIDE_H} />
        }
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
  silhouetteWrapper: {
    width: GUIDE_W,
    height: GUIDE_H,
    alignItems: 'center',
    justifyContent: 'center',
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
