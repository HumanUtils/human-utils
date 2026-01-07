/**
 * Button Demo Screen
 *
 * Showcase all button components and variants for design approval.
 * Temporary file - will be deleted after refactoring existing screens.
 *
 * @module screens/ButtonDemoScreen
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { spacing } from '../theme/spacing';
import { Container, ToolHeader, Button, ButtonGroup, Heading, Body, Caption, Label } from '../components';
import { Download, Save, Plus, X, Info, Trash2, Settings } from 'lucide-react-native';

export const ButtonDemoScreen = () => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [selectedChip, setSelectedChip] = useState('plan1');
  const [operation, setOperation] = useState('add');

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ToolHeader
            icon={Settings}
            title="Button Components"
            description="Design system button showcase"
          />

          {/* Standard Buttons */}
          <View style={styles.section}>
            <Heading variant="h3">Standard Buttons</Heading>
            <Caption color="textMuted">Different variants and states</Caption>

            <View style={styles.demoGroup}>
              <Label size="large">Primary</Label>
              <Button variant="primary" onPress={() => {}}>
                Primary Button
              </Button>
              <Button variant="primary" onPress={() => {}} disabled>
                Disabled
              </Button>
              <Button variant="primary" onPress={() => {}} loading>
                Loading
              </Button>
            </View>

            <View style={styles.demoGroup}>
              <Label size="large">Secondary</Label>
              <Button variant="secondary" onPress={() => {}}>
                Secondary Button
              </Button>
              <Button variant="secondary" onPress={() => {}} disabled>
                Disabled
              </Button>
            </View>

            <View style={styles.demoGroup}>
              <Label size="large">Outline</Label>
              <Button variant="outline" onPress={() => {}}>
                Outline Button
              </Button>
              <Button variant="outline" onPress={() => {}} disabled>
                Disabled
              </Button>
            </View>

            <View style={styles.demoGroup}>
              <Label size="large">Ghost</Label>
              <Button variant="ghost" onPress={() => {}}>
                Ghost Button
              </Button>
              <Button variant="ghost" onPress={() => {}} disabled>
                Disabled
              </Button>
            </View>
          </View>

          {/* Sizes */}
          <View style={styles.section}>
            <Heading variant="h3">Button Sizes</Heading>
            <Caption color="textMuted">Small, medium, and large variants</Caption>

            <View style={styles.demoGroup}>
              <Button variant="primary" size="small" onPress={() => {}}>
                Small Button
              </Button>
              <Button variant="primary" size="medium" onPress={() => {}}>
                Medium Button
              </Button>
              <Button variant="primary" size="large" onPress={() => {}}>
                Large Button
              </Button>
            </View>
          </View>

          {/* With Icons */}
          <View style={styles.section}>
            <Heading variant="h3">Buttons with Icons</Heading>
            <Caption color="textMuted">Icons enhance button meaning</Caption>

            <View style={styles.demoGroup}>
              <Button variant="primary" icon={Download} onPress={() => {}}>
                Download
              </Button>
              <Button variant="secondary" icon={Save} onPress={() => {}}>
                Save Changes
              </Button>
              <Button variant="outline" icon={Plus} iconPosition="right" onPress={() => {}}>
                Add Item
              </Button>
            </View>
          </View>

          {/* Full Width */}
          <View style={styles.section}>
            <Heading variant="h3">Full Width Buttons</Heading>
            <Caption color="textMuted">Buttons that span container width</Caption>

            <View style={styles.demoGroup}>
              <Button variant="primary" fullWidth onPress={() => {}}>
                Full Width Primary
              </Button>
              <Button variant="secondary" fullWidth icon={Download} onPress={() => {}}>
                Full Width with Icon
              </Button>
            </View>
          </View>

          {/* Icon Buttons */}
          <View style={styles.section}>
            <Heading variant="h3">Icon Buttons</Heading>
            <Caption color="textMuted">Compact buttons for toolbar actions</Caption>

            <View style={styles.demoGroup}>
              <Label size="large">Variants</Label>
              <View style={styles.row}>
                <Button iconOnly icon={Info} variant="primary" onPress={() => {}} />
                <Button iconOnly icon={Settings} variant="secondary" onPress={() => {}} />
                <Button iconOnly icon={X} variant="ghost" onPress={() => {}} />
              </View>
            </View>

            <View style={styles.demoGroup}>
              <Label size="large">Sizes</Label>
              <View style={styles.row}>
                <Button iconOnly icon={Trash2} variant="secondary" size="small" onPress={() => {}} />
                <Button iconOnly icon={Trash2} variant="secondary" size="medium" onPress={() => {}} />
                <Button iconOnly icon={Trash2} variant="secondary" size="large" onPress={() => {}} />
              </View>
            </View>
          </View>

          {/* Pills/Chips */}
          <View style={styles.section}>
            <Heading variant="h3">Pills (Chips)</Heading>
            <Caption color="textMuted">Small toggle buttons for selections</Caption>

            <View style={styles.demoGroup}>
              <Label size="large">Student Loan Plans</Label>
              <ButtonGroup>
                <Button pill selected={selectedChip === 'plan1'} onPress={() => setSelectedChip('plan1')}>
                  Plan 1
                </Button>
                <Button pill selected={selectedChip === 'plan2'} onPress={() => setSelectedChip('plan2')}>
                  Plan 2
                </Button>
                <Button pill selected={selectedChip === 'plan4'} onPress={() => setSelectedChip('plan4')}>
                  Plan 4
                </Button>
                <Button pill selected={selectedChip === 'none'} onPress={() => setSelectedChip('none')}>
                  None
                </Button>
              </ButtonGroup>
            </View>

            <View style={styles.demoGroup}>
              <Label size="large">VAT Rates</Label>
              <ButtonGroup>
                <Button pill selected={selectedChip === '20'} onPress={() => setSelectedChip('20')}>
                  20%
                </Button>
                <Button pill selected={selectedChip === '15'} onPress={() => setSelectedChip('15')}>
                  15%
                </Button>
                <Button pill selected={selectedChip === '10'} onPress={() => setSelectedChip('10')}>
                  10%
                </Button>
                <Button pill selected={selectedChip === '5'} onPress={() => setSelectedChip('5')}>
                  5%
                </Button>
                <Button pill selected={selectedChip === 'custom'} onPress={() => setSelectedChip('custom')}>
                  Custom
                </Button>
              </ButtonGroup>
            </View>
          </View>

          {/* Segmented Control */}
          <View style={styles.section}>
            <Heading variant="h3">Segmented Control</Heading>
            <Caption color="textMuted">Mutually exclusive options</Caption>

            <View style={styles.demoGroup}>
              <Label size="large">VAT Operation</Label>
              <ButtonGroup segmented>
                <Button
                  segmented
                  selected={operation === 'add'}
                  description="Add VAT to net amount"
                  onPress={() => setOperation('add')}
                >
                  Add VAT
                </Button>
                <Button
                  segmented
                  selected={operation === 'remove'}
                  description="Remove VAT from gross"
                  onPress={() => setOperation('remove')}
                >
                  Remove VAT
                </Button>
              </ButtonGroup>
            </View>

            <View style={styles.demoGroup}>
              <Label size="large">Without Descriptions</Label>
              <ButtonGroup segmented>
                <Button segmented selected={operation === 'list'} onPress={() => setOperation('list')}>
                  List View
                </Button>
                <Button segmented selected={operation === 'grid'} onPress={() => setOperation('grid')}>
                  Grid View
                </Button>
                <Button segmented selected={operation === 'compact'} onPress={() => setOperation('compact')}>
                  Compact
                </Button>
              </ButtonGroup>
            </View>
          </View>

          {/* Real-world Example */}
          <View style={styles.section}>
            <Heading variant="h3">Real-world Example</Heading>
            <Caption color="textMuted">How components work together</Caption>

            <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Heading variant="h3" color="primary">Tax Calculator</Heading>
              <Body color="textSecondary" style={{ marginBottom: spacing.l }}>
                Calculate your self-employed tax liability
              </Body>

              <ButtonGroup segmented style={{ marginBottom: spacing.l }}>
                <Button segmented selected onPress={() => {}}>
                  UK 2024/25
                </Button>
                <Button segmented selected={false} onPress={() => {}}>
                  Previous Year
                </Button>
              </ButtonGroup>

              <View style={{ marginBottom: spacing.l }}>
                <Label size="large" style={{ marginBottom: spacing.s }}>Student Loan Plan</Label>
                <ButtonGroup>
                  <Button pill selected={selectedChip === 'plan1'} onPress={() => setSelectedChip('plan1')}>
                    Plan 1
                  </Button>
                  <Button pill selected={selectedChip === 'plan2'} onPress={() => setSelectedChip('plan2')}>
                    Plan 2
                  </Button>
                  <Button pill selected={selectedChip === 'none'} onPress={() => setSelectedChip('none')}>
                    None
                  </Button>
                </ButtonGroup>
              </View>

              <View style={{ gap: spacing.m }}>
                <Button variant="primary" fullWidth icon={Download} onPress={() => {}}>
                  Calculate Tax
                </Button>
                <Button variant="outline" fullWidth onPress={() => {}}>
                  Reset Form
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  section: {
    marginBottom: spacing.xl,
  },
  demoGroup: {
    marginTop: spacing.m,
    gap: spacing.m,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.m,
    alignItems: 'center',
  },
  card: {
    padding: spacing.l,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: spacing.m,
  },
});
