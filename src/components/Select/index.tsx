import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { styles } from "./styles";

type Option = {
    label: string;
    value: string;
}

type Props = {
    label: string;
    placeholder?: string;
    options: Option[];
    value?: string;
    onValueChange: (value: string) => void;
    errorMessage?: string;
}

export function Select({ label, placeholder = "Selecione", options, value, onValueChange, errorMessage }: Props) {
    const [open, setOpen] = useState(false);

    const selectedOption = options.find((opt) => opt.value === value);

    return (
        <View style={styles.formGroup}>
            <Text style={styles.formLabel}>{label}</Text>
            <TouchableOpacity style={styles.formInput} onPress={() => setOpen(true)} activeOpacity={0.7}>
                <Text style={[styles.formValue, !selectedOption && styles.formPlaceholder]}>
                    {selectedOption ? selectedOption.label : placeholder}
                </Text>
                <Text style={styles.arrow}>▼</Text>
            </TouchableOpacity>
            {!!errorMessage && <Text style={styles.formError}>{errorMessage}</Text>}

            <Modal visible={open} transparent animationType="fade">
                <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setOpen(false)}>
                    <View style={styles.dropdown}>
                        <ScrollView>
                            {options.map((opt) => (
                                <TouchableOpacity
                                    key={opt.value}
                                    style={[styles.option, opt.value === value && styles.optionSelected]}
                                    onPress={() => {
                                        onValueChange(opt.value);
                                        setOpen(false);
                                    }}
                                >
                                    <Text style={[styles.optionText, opt.value === value && styles.optionTextSelected]}>
                                        {opt.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}
