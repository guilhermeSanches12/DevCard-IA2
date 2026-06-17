import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/Buttons";
import { THEME } from "../styles/contants";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { ButtonGroupColors } from "../components/ButtonGroupColors";
import { useState } from "react";
import { useRouter } from "expo-router";

const ROLE_OPTIONS = [
    { label: "Desenvolvedor Front-end", value: "Desenvolvedor Front-end" },
    { label: "Desenvolvedor Back-end", value: "Desenvolvedor Back-end" },
    { label: "Desenvolvedor Full Stack", value: "Desenvolvedor Full Stack" },
]

const TECHNOLOGY_OPTIONS = [
    { label: "React", value: "React" },
    { label: "Vue", value: "Vue" },
    { label: "Angular", value: "Angular" },
    { label: "Node.js", value: "Node.js" },
    { label: ".NET", value: ".NET" },
    { label: "Java", value: "Java" },
    { label: "Python", value: "Python" },
    { label: "PHP", value: "PHP" },
    { label: "TypeScript", value: "TypeScript" },
    { label: "JavaScript", value: "JavaScript" },
    { label: "Banco de Dados", value: "Banco de Dados" },
    { label: "Inteligência Artificial", value: "Inteligência Artificial" },
    { label: "DevOps", value: "DevOps" },
    { label: "UX/UI Design", value: "UX/UI Design" },
    { label: "Outra", value: "Outra" },
]

const CARD_COLORS = [
    {
      id: "c1",
      name: "Azul",
      colorCode: "#4446f0",
    },
    {
      id: "c2",
      name: "Verde",
      colorCode: "#4ca35b",
    },
    {
      id: "c3",
      name: "Roxo",
      colorCode: "#3f1072",
    },
    {
      id: "c4",
      name: "Rose",
      colorCode: "#970957"
    },
]

export type Form = {
  fullName: string,
  role: string,
  company?: string,
  experience: number,
  technology: string,
  cardColor: string,
}

type Error = {
  fullName?: string,
  role?: string,
  company?: string,
  experience?: string,
  technology?: string,
  cardColor?: string,
}

export default function CadastroScreen() {
  const router = useRouter()

  const [form, setForm] = useState<{ data: Form, errors: Error }>({
    data: {
      fullName: "",
      role: "",
      company: "",
      experience: 0,
      technology: "",
      cardColor: "s",
    },
    errors: { }
  })

  function handleSubmit() {
    router.push({
      pathname: "/preview",
      params: form.data
    })
  }

  function handleInputChange(fieldName: keyof Form, value: string | number) {
    if (!value) return
    setForm((currentForm) => {
      return {
        ...currentForm,
        data: {
          ...currentForm.data,
          [fieldName]: value
        }
      }
    })

    handleInputValidation(fieldName)
  }

  function handleSetOrRemoveInputError(fieldName: keyof Form, error: string | undefined) {
    setForm((currentForm) => {
      return {
        ...currentForm,
        errors: {
          ...currentForm.errors,
          [fieldName]: error
        }
      }
    })
    
  }
  
  function handleInputValidation(field: keyof Form){
    const { fullName, role, cardColor, technology, experience } = form.data

    switch(field){
      case "fullName":
        // required, min 3 char
        if (fullName.length === 0) {
          handleSetOrRemoveInputError("fullName", "Informe o nome completo")
        }
        if (fullName.length < 3) {
          handleSetOrRemoveInputError("fullName", "Informe pelo menos 3 caracteres")
        }
        if (fullName.length >= 3) {
          handleSetOrRemoveInputError("fullName", undefined)
        }
        break
      case "role":
        // required
        if (role.length === 0) {
          handleSetOrRemoveInputError("role", "Informe seu cargo")
        } else {
          handleSetOrRemoveInputError("role", undefined)
        }
        break
      case "experience":
        // required > 0
        if (experience < 1) {
          handleSetOrRemoveInputError("experience", "Você deve ter pelo menos 1 ano de experiência")
        }
        else {
          handleSetOrRemoveInputError("experience", undefined)
        }
        break
      case "technology":
        // required
        if (technology.length === 0) {
          handleSetOrRemoveInputError("technology", "Informe sua tecnologia favorita")
        }
        else {
          handleSetOrRemoveInputError("technology", undefined)
        }
        break
      case "cardColor":
        // if (cardColor.length === 0) {
        //   handleSetOrRemoveInputError("cardColor", "Selecione pelo menos 1 cor")
        // }
        // else {
        //   handleSetOrRemoveInputError("cardColor", undefined)
        // }
        break
      
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* Cabeçalho do App */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Cadastro</Text>
            <Text style={styles.subtitle}>Preencha seus dados de dev</Text>
          </View>

          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={{ gap: 12, marginBottom: 8 }}>
              <Input 
                onChangeText={(text) => handleInputChange('fullName', text)}
                label="Nome Completo"
                placeholder="Guilherme"
                defaultValue={form.data.fullName}
                onChange={() => {
                  handleInputValidation("fullName")
                }}
                onBlur={() => {
                  handleInputValidation("fullName")
                }}
                errorMessage={form.errors["fullName"]}
              />
              <Select
                label="Cargo"
                placeholder="Selecione o cargo"
                options={ROLE_OPTIONS}
                value={form.data.role}
                onValueChange={(value) => {
                  handleInputChange('role', value)
                  handleSetOrRemoveInputError("role", value ? undefined : "Informe seu cargo")
                }}
                errorMessage={form.errors["role"]}
              />
              <Input
                onChangeText={(text) => handleInputChange('company', text)}
                label="Empresa"
                placeholder="UNIVAG"
                defaultValue={form.data.company}
                onChange={() => {
                  handleInputValidation("company")
                }}
                onBlur={() => {
                  handleInputValidation("company")
                }}
                errorMessage={form.errors["company"]}
              />
              <Input 
                onChangeText={(text) => handleInputChange('experience', parseInt(text))}
                label="Anos de Experiência"
                placeholder="20"
                defaultValue={form.data.experience.toString()}
                onChange={() => {
                  handleInputValidation("experience")
                }}
                onBlur={() => {
                  handleInputValidation("experience")
                }}
                errorMessage={form.errors["experience"]}
              />
              <Select
                label="Tecnologia Favorita"
                placeholder="Selecione uma tecnologia"
                options={TECHNOLOGY_OPTIONS}
                value={form.data.technology}
                onValueChange={(value) => {
                  handleInputChange('technology', value)
                  handleSetOrRemoveInputError("technology", value ? undefined : "Informe sua tecnologia favorita")
                }}
                errorMessage={form.errors["technology"]}
              />
            </View>

            <ButtonGroupColors onSelect={(colorCode) => handleInputChange('cardColor', colorCode)} group={CARD_COLORS} />
          </ScrollView>
          
          {/* Rodapé do App */}
          <View style={styles.footerContainer}>
            <Button
              onPress={handleSubmit}
              label="Gerar Cartão"
              disabled={Object.entries(form.errors).filter(([key, value]) => !!value).length > 0}
            />
            <Button label="Voltar" variant="secondary" onPress={() => router.push("/")} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "center",
    paddingHorizontal: 24,
    gap: 10,
  },
  headerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 4,
  },
  title: {
    color: THEME.colors.heading,
    fontSize: THEME.text.heading.h3,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 22,
  },
  footerContainer: {
    flexDirection: "column",
    gap: 12,
  },
  subtitle: {
    color: THEME.colors.subtitle,
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
});