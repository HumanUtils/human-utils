/**
 * ControlledInput Component
 *
 * Input component integrated with react-hook-form for form validation and state management.
 * Wraps the standard Input component with Controller for seamless form integration.
 *
 * @module components/ControlledInput
 * @author Lewis Goodwin <https://github.com/is-Lewis>
 */

import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Input, InputProps } from './Input';

interface ControlledInputProps<T extends FieldValues> extends Omit<InputProps, 'value' | 'onChangeText'> {
  /** react-hook-form control object */
  control: Control<T>;
  /** Field name from form schema */
  name: Path<T>;
  /** Optional default value */
  defaultValue?: string;
}

/**
 * Form-controlled input component.
 *
 * Integrates Input component with react-hook-form for validation and state management.
 * Automatically displays validation errors from form schema.
 *
 * @param control - react-hook-form control object
 * @param name - Field name matching form schema
 * @param defaultValue - Optional default value
 * @param ...props - All Input component props (label, prefix, suffix, mono, etc.)
 * @returns Controlled input component
 *
 * @example
 * ```tsx
 * import { useForm } from 'react-hook-form';
 * import { z } from 'zod';
 * import { zodResolver } from '@hookform/resolvers/zod';
 *
 * const schema = z.object({
 *   email: z.string().email('Invalid email address'),
 *   income: z.number().min(0),
 * });
 * type FormData = z.infer<typeof schema>;
 *
 * function MyForm() {
 *   const { control, handleSubmit } = useForm<FormData>({
 *     resolver: zodResolver(schema),
 *   });
 *
 *   return (
 *     <>
 *       <ControlledInput
 *         control={control}
 *         name="email"
 *         label="Email Address"
 *         keyboardType="email-address"
 *       />
 *       <ControlledInput
 *         control={control}
 *         name="income"
 *         label="Annual Income"
 *         prefix="£"
 *         keyboardType="numeric"
 *         mono
 *       />
 *     </>
 *   );
 * }
 * ```
 */
export function ControlledInput<T extends FieldValues>({
  control,
  name,
  defaultValue = '',
  ...inputProps
}: ControlledInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue as any}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Input
          {...inputProps}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          error={error?.message}
        />
      )}
    />
  );
}
