import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { UserInput } from '../types';

const GENDER_OPTIONS = [
  { value: 'female', label: '女性' },
  { value: 'male',   label: '男性' },
  { value: 'unknown',label: '未回答' },
] as const;

export default function InputScreen() {
  const { setUserInput } = useApp();
  const [input, setInput] = useState<UserInput>({
    height: '', weight: '', footSize: '', gender: 'unknown',
  });

  const onChange = (field: keyof UserInput, value: string) =>
    setInput(prev => ({ ...prev, [field]: value }));

  const handleNext = () => {
    const h = parseFloat(input.height);
    if (!input.height || isNaN(h) || h < 50 || h > 250) {
      Alert.alert('入力エラー', '身長を正しく入力してください（50〜250cm）');
      return;
    }
    setUserInput(input);
    router.push('/camera/front');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>📏 AI採寸</Text>
          <Text style={styles.subtitle}>
            写真2枚と身長から{'\n'}全身の採寸を自動推定します
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Field
            label="身長 (cm) ＊必須"
            placeholder="例: 165"
            value={input.height}
            onChangeText={v => onChange('height', v)}
            keyboardType="decimal-pad"
          />
          <Field
            label="体重 (kg)"
            placeholder="例: 55"
            value={input.weight}
            onChangeText={v => onChange('weight', v)}
            keyboardType="decimal-pad"
          />
          <Field
            label="足のサイズ (cm)"
            placeholder="例: 24.5"
            value={input.footSize}
            onChangeText={v => onChange('footSize', v)}
            keyboardType="decimal-pad"
          />

          {/* Gender selector */}
          <Text style={styles.label}>性別（推定精度向上のため）</Text>
          <View style={styles.genderRow}>
            {GENDER_OPTIONS.map(opt => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.genderBtn,
                  input.gender === opt.value && styles.genderBtnActive,
                ]}
                onPress={() => setInput(p => ({ ...p, gender: opt.value }))}
              >
                <Text style={[
                  styles.genderText,
                  input.gender === opt.value && styles.genderTextActive,
                ]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Info note */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            💡 写真は端末内のみで処理され、サーバーには送信されません。
            顔は自動でぼかすことができます。
          </Text>
        </View>

        {/* Next button */}
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextBtnText}>正面写真を撮影する →</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({
  label, placeholder, value, onChangeText, keyboardType,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (v: string) => void;
  keyboardType?: 'decimal-pad' | 'default';
}) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#555"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType ?? 'default'}
        returnKeyType="next"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: 24,
    paddingBottom: 48,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 32,
  },
  logo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#aaa',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    gap: 4,
  },
  fieldWrap: {
    marginBottom: 16,
  },
  label: {
    color: '#bbb',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#1a1a2e',
    borderWidth: 1,
    borderColor: '#2a2a4a',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 17,
    color: '#fff',
  },
  genderRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  genderBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2a2a4a',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  genderBtnActive: {
    borderColor: '#00d4aa',
    backgroundColor: '#00d4aa22',
  },
  genderText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
  },
  genderTextActive: {
    color: '#00d4aa',
  },
  infoBox: {
    backgroundColor: '#1a1a2e',
    borderRadius: 10,
    padding: 14,
    marginVertical: 20,
  },
  infoText: {
    color: '#888',
    fontSize: 12,
    lineHeight: 18,
  },
  nextBtn: {
    backgroundColor: '#00d4aa',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextBtnText: {
    color: '#0f0f1a',
    fontSize: 16,
    fontWeight: '800',
  },
});
