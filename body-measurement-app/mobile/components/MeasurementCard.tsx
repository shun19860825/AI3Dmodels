import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CONFIDENCE_COLORS, CONFIDENCE_LABELS } from '../constants/measurements';
import { Measurement } from '../types';

interface Props {
  measurement: Measurement;
  description?: string;
}

export default function MeasurementCard({ measurement, description }: Props) {
  const { name_ja, value, unit, confidence, note } = measurement;
  const color = CONFIDENCE_COLORS[confidence] ?? '#888';
  const label = CONFIDENCE_LABELS[confidence] ?? confidence;

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.name}>{name_ja}</Text>
        {description ? (
          <Text style={styles.description} numberOfLines={1}>
            {description}
          </Text>
        ) : null}
        {note ? <Text style={styles.note}>{note}</Text> : null}
      </View>
      <View style={styles.right}>
        <Text style={styles.value}>
          {value != null ? value.toFixed(1) : '—'}
          <Text style={styles.unit}> {unit}</Text>
        </Text>
        <View style={[styles.badge, { backgroundColor: color + '22', borderColor: color }]}>
          <Text style={[styles.badgeText, { color }]}>{label}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2a3a',
  },
  left: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#e8e8f0',
  },
  description: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  note: {
    fontSize: 11,
    color: '#f59e0b',
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
    gap: 4,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  unit: {
    fontSize: 13,
    fontWeight: '400',
    color: '#aaa',
  },
  badge: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
});
