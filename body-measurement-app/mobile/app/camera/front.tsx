import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CameraGuide from '../../components/CameraGuide';
import { useApp } from '../../context/AppContext';

export default function CameraFrontScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const { setFrontPhoto } = useApp();

  if (!permission) return <View style={styles.container} />;

  if (!permission.granted) {
    return (
      <View style={styles.permissionScreen}>
        <Text style={styles.permissionText}>
          カメラへのアクセス許可が必要です
        </Text>
        <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
          <Text style={styles.permissionBtnText}>許可する</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const capture = async () => {
    if (!cameraRef.current || processing) return;
    setProcessing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.85 });
      if (!photo) throw new Error('撮影に失敗しました');

      // Resize to max 1200px on the long side to keep upload fast
      const resized = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 1200 } }],
        { compress: 0.85, format: ImageManipulator.SaveFormat.JPEG },
      );
      setPreview(resized.uri);
    } catch (e: unknown) {
      Alert.alert('エラー', e instanceof Error ? e.message : '撮影に失敗しました');
    } finally {
      setProcessing(false);
    }
  };

  const confirmPhoto = () => {
    if (!preview) return;
    setFrontPhoto(preview);
    router.push('/camera/side');
  };

  const retake = () => setPreview(null);

  if (preview) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: preview }} style={styles.preview} resizeMode="contain" />
        <View style={styles.previewActions}>
          <TouchableOpacity style={styles.retakeBtn} onPress={retake}>
            <Text style={styles.retakeBtnText}>撮り直す</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmBtn} onPress={confirmPhoto}>
            <Text style={styles.confirmBtnText}>この写真を使う →</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing="back" />
      <CameraGuide mode="front" />

      {/* Step indicator */}
      <View style={styles.stepBadge}>
        <Text style={styles.stepText}>STEP 1 / 2　正面写真</Text>
      </View>

      {/* Shutter */}
      <View style={styles.shutterRow}>
        <TouchableOpacity
          style={[styles.shutter, processing && styles.shutterDisabled]}
          onPress={capture}
          disabled={processing}
        >
          {processing
            ? <ActivityIndicator color="#0f0f1a" />
            : <View style={styles.shutterInner} />
          }
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  permissionScreen: {
    flex: 1, backgroundColor: '#0f0f1a',
    alignItems: 'center', justifyContent: 'center', padding: 32,
  },
  permissionText: { color: '#fff', fontSize: 16, textAlign: 'center', marginBottom: 24 },
  permissionBtn: {
    backgroundColor: '#00d4aa', borderRadius: 12,
    paddingHorizontal: 32, paddingVertical: 14,
  },
  permissionBtnText: { color: '#0f0f1a', fontWeight: '800', fontSize: 16 },
  stepBadge: {
    position: 'absolute', top: 56, alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.65)', borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 6,
  },
  stepText: { color: '#00d4aa', fontSize: 13, fontWeight: '700' },
  shutterRow: {
    position: 'absolute', bottom: 48,
    width: '100%', alignItems: 'center',
  },
  shutter: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 4, borderColor: 'rgba(255,255,255,0.4)',
  },
  shutterDisabled: { opacity: 0.5 },
  shutterInner: {
    width: 54, height: 54, borderRadius: 27, backgroundColor: '#fff',
  },
  preview: { flex: 1 },
  previewActions: {
    flexDirection: 'row',
    backgroundColor: '#0f0f1a',
    padding: 16,
    gap: 12,
  },
  retakeBtn: {
    flex: 1, borderWidth: 1, borderColor: '#444',
    borderRadius: 12, paddingVertical: 14, alignItems: 'center',
  },
  retakeBtnText: { color: '#aaa', fontWeight: '700', fontSize: 15 },
  confirmBtn: {
    flex: 2, backgroundColor: '#00d4aa',
    borderRadius: 12, paddingVertical: 14, alignItems: 'center',
  },
  confirmBtnText: { color: '#0f0f1a', fontWeight: '800', fontSize: 15 },
});
