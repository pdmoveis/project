import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

const colors = {
  primary: '#FF8C42',
  primaryLight: '#FFF0E6',
  secondary: '#6B7280',
  background: '#F3F4F6',
  surface: '#FFFFFF',
  text: '#111827',
  muted: '#6B7280',
  border: '#E5E7EB',
  success: '#10B981',
};

const disciplines = [
  {
    id: '1',
    name: 'Programação Web',
    teacher: 'Prof. Ana Souza',
    progress: 72,
    contents: [
      { type: 'PDF', title: 'Introdução ao HTML e CSS' },
      { type: 'Vídeo', title: 'Aula prática: layouts responsivos' },
      { type: 'Link', title: 'Documentação MDN' },
    ],
  },
  {
    id: '2',
    name: 'Matemática Aplicada',
    teacher: 'Prof. Marcos Lima',
    progress: 48,
    contents: [
      { type: 'PDF', title: 'Funções e gráficos' },
      { type: 'Vídeo', title: 'Resolução de exercícios' },
      { type: 'Fonte', title: 'Lista complementar' },
    ],
  },
  {
    id: '3',
    name: 'Banco de Dados',
    teacher: 'Prof. Carla Mendes',
    progress: 35,
    contents: [
      { type: 'PDF', title: 'Modelo entidade-relacionamento' },
      { type: 'Vídeo', title: 'Normalização na prática' },
      { type: 'Link', title: 'SQLBolt' },
    ],
  },
];

const initialMessages = [
  { id: '1', from: 'bot', text: 'Olá! Sou o assistente What IF?. Posso te ajudar a revisar conteúdos das suas disciplinas.' },
];

function Button({ title, onPress, variant = 'primary' }) {
  return (
    <Pressable onPress={onPress} style={[styles.button, variant === 'outline' && styles.outlineButton]}>
      <Text style={[styles.buttonText, variant === 'outline' && styles.outlineButtonText]}>{title}</Text>
    </Pressable>
  );
}

function Header({ title, subtitle }) {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>What IF?</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

function LoginScreen({ setScreen }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.authContainer}>
        <View style={styles.brandCircle}><Text style={styles.brandText}>IF</Text></View>
        <Header title="Centralize seus estudos" subtitle="Conteúdos, disciplinas e chatbot acadêmico em um só lugar." />
        <View style={styles.card}>
          <Text style={styles.label}>E-mail institucional</Text>
          <TextInput style={styles.input} placeholder="seunome@discente.ifpe.edu.br" />
          <Text style={styles.label}>Senha</Text>
          <TextInput style={styles.input} placeholder="Sua senha" secureTextEntry />
          <Button title="Entrar" onPress={() => setScreen('home')} />
          <Pressable onPress={() => setScreen('register')}><Text style={styles.link}>Criar conta de estudante</Text></Pressable>
        </View>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

function RegisterScreen({ setScreen }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.authContainer}>
        <Header title="Cadastro" subtitle="Protótipo de cadastro para estudantes do IFPE Campus Paulista." />
        <View style={styles.card}>
          <Text style={styles.label}>Nome completo</Text>
          <TextInput style={styles.input} placeholder="Seu nome" />
          <Text style={styles.label}>Curso</Text>
          <TextInput style={styles.input} placeholder="Ex: ADS, Ensino Médio Integrado" />
          <Text style={styles.label}>E-mail</Text>
          <TextInput style={styles.input} placeholder="E-mail institucional" />
          <Button title="Cadastrar" onPress={() => setScreen('home')} />
          <Button title="Voltar para login" variant="outline" onPress={() => setScreen('login')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function HomeScreen({ setScreen }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header title="Olá, estudante" subtitle="Confira seus conteúdos e tire dúvidas com o assistente." />
        <View style={styles.statsRow}>
          <View style={styles.statCard}><Text style={styles.statNumber}>3</Text><Text style={styles.statLabel}>Disciplinas</Text></View>
          <View style={styles.statCard}><Text style={styles.statNumber}>52%</Text><Text style={styles.statLabel}>Progresso</Text></View>
        </View>
        <Pressable style={styles.heroCard} onPress={() => setScreen('chat')}>
          <Text style={styles.heroTitle}>Chatbot acadêmico</Text>
          <Text style={styles.heroText}>Faça perguntas sobre PDFs, videoaulas e materiais enviados pelos professores.</Text>
        </Pressable>
        <Text style={styles.sectionTitle}>Acesso rápido</Text>
        <View style={styles.grid}>
          <Pressable style={styles.menuCard} onPress={() => setScreen('courses')}><Text style={styles.menuIcon}>📚</Text><Text style={styles.menuTitle}>Disciplinas</Text></Pressable>
          <Pressable style={styles.menuCard} onPress={() => setScreen('chat')}><Text style={styles.menuIcon}>💬</Text><Text style={styles.menuTitle}>Chat</Text></Pressable>
          <Pressable style={styles.menuCard} onPress={() => setScreen('profile')}><Text style={styles.menuIcon}>👤</Text><Text style={styles.menuTitle}>Perfil</Text></Pressable>
        </View>
      </ScrollView>
      <TabBar screen="home" setScreen={setScreen} />
    </SafeAreaView>
  );
}

function CoursesScreen({ setScreen, setSelectedCourse }) {
  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        contentContainerStyle={styles.container}
        data={disciplines}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Header title="Minhas disciplinas" subtitle="Materiais organizados por professor e disciplina." />}
        renderItem={({ item }) => (
          <Pressable style={styles.courseCard} onPress={() => { setSelectedCourse(item); setScreen('courseDetail'); }}>
            <View style={styles.courseHeader}>
              <Text style={styles.courseTitle}>{item.name}</Text>
              <Text style={styles.badge}>{item.progress}%</Text>
            </View>
            <Text style={styles.subtitle}>{item.teacher}</Text>
            <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${item.progress}%` }]} /></View>
          </Pressable>
        )}
      />
      <TabBar screen="courses" setScreen={setScreen} />
    </SafeAreaView>
  );
}

function CourseDetailScreen({ course, setScreen }) {
  const current = course || disciplines[0];
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Button title="Voltar" variant="outline" onPress={() => setScreen('courses')} />
        <Header title={current.name} subtitle={current.teacher} />
        <Text style={styles.sectionTitle}>Conteúdos disponíveis</Text>
        {current.contents.map((content, index) => (
          <View key={index} style={styles.contentCard}>
            <Text style={styles.contentType}>{content.type}</Text>
            <Text style={styles.contentTitle}>{content.title}</Text>
            <Text style={styles.contentDescription}>Material demonstrativo para apresentação do protótipo.</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function ChatScreen({ setScreen }) {
  const [messages, setMessages] = useState(initialMessages);
  const [text, setText] = useState('');
  const sendMessage = () => {
    if (!text.trim()) return;
    const userMessage = { id: String(Date.now()), from: 'user', text };
    setMessages((current) => [...current, userMessage]);
    setText('');
    setTimeout(() => {
      setMessages((current) => [...current, { id: String(Date.now() + 1), from: 'bot', text: 'Com base nos materiais da disciplina, eu começaria revisando os conceitos principais e depois resolveria um exercício simples. Quer que eu monte um resumo rápido?' }]);
    }, 700);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.chatHeader}><Text style={styles.title}>Chat What IF?</Text><Text style={styles.subtitle}>Resposta mockada para demonstração</Text></View>
      <FlatList
        style={styles.chatList}
        contentContainerStyle={styles.chatContent}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <View style={[styles.message, item.from === 'user' ? styles.userMessage : styles.botMessage]}><Text style={styles.messageText}>{item.text}</Text></View>}
      />
      <View style={styles.chatInputRow}>
        <TextInput value={text} onChangeText={setText} style={styles.chatInput} placeholder="Digite sua dúvida..." />
        <Pressable style={styles.sendButton} onPress={sendMessage}><Text style={styles.sendButtonText}>Enviar</Text></Pressable>
      </View>
      <TabBar screen="chat" setScreen={setScreen} />
    </SafeAreaView>
  );
}

function ProfileScreen({ setScreen }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header title="Perfil do estudante" subtitle="Dados simulados para o protótipo." />
        <View style={styles.profileCard}>
          <View style={styles.avatar}><Text style={styles.avatarText}>JS</Text></View>
          <Text style={styles.profileName}>João Silva</Text>
          <Text style={styles.subtitle}>ADS • IFPE Campus Paulista</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.infoLine}>E-mail: joao.silva@discente.ifpe.edu.br</Text>
          <Text style={styles.infoLine}>Matrícula: 2026.1.0001</Text>
          <Text style={styles.infoLine}>Notificações: ativadas</Text>
        </View>
        <Button title="Sair" variant="outline" onPress={() => setScreen('login')} />
      </ScrollView>
      <TabBar screen="profile" setScreen={setScreen} />
    </SafeAreaView>
  );
}

function TabBar({ screen, setScreen }) {
  const tabs = [
    ['home', 'Início'],
    ['courses', 'Disciplinas'],
    ['chat', 'Chat'],
    ['profile', 'Perfil'],
  ];
  return (
    <View style={styles.tabBar}>
      {tabs.map(([key, label]) => (
        <Pressable key={key} onPress={() => setScreen(key)} style={styles.tabItem}>
          <Text style={[styles.tabText, screen === key && styles.activeTab]}>{label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export default function App() {
  const [screen, setScreen] = useState('login');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const screens = useMemo(() => ({
    login: <LoginScreen setScreen={setScreen} />,
    register: <RegisterScreen setScreen={setScreen} />,
    home: <HomeScreen setScreen={setScreen} />,
    courses: <CoursesScreen setScreen={setScreen} setSelectedCourse={setSelectedCourse} />,
    courseDetail: <CourseDetailScreen course={selectedCourse} setScreen={setScreen} />,
    chat: <ChatScreen setScreen={setScreen} />,
    profile: <ProfileScreen setScreen={setScreen} />,
  }), [screen, selectedCourse]);
  return screens[screen];
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: 20, paddingBottom: 110 },
  authContainer: { flexGrow: 1, justifyContent: 'center', padding: 24, backgroundColor: colors.background },
  brandCircle: { width: 88, height: 88, borderRadius: 44, backgroundColor: colors.primary, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  brandText: { color: colors.surface, fontSize: 30, fontWeight: '800' },
  header: { marginBottom: 22 },
  logo: { color: colors.primary, fontSize: 16, fontWeight: '800', marginBottom: 8, textAlign: 'center' },
  title: { color: colors.text, fontSize: 28, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 22, textAlign: 'center', marginTop: 8 },
  card: { backgroundColor: colors.surface, borderRadius: 18, padding: 18, gap: 12, borderWidth: 1, borderColor: colors.border },
  label: { color: colors.text, fontSize: 14, fontWeight: '700' },
  input: { backgroundColor: colors.background, borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 14, fontSize: 15 },
  button: { backgroundColor: colors.primary, borderRadius: 14, padding: 15, alignItems: 'center', marginTop: 8 },
  outlineButton: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.primary },
  buttonText: { color: colors.surface, fontWeight: '800', fontSize: 15 },
  outlineButtonText: { color: colors.primary },
  link: { color: colors.primary, textAlign: 'center', fontWeight: '700', marginTop: 8 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  statCard: { flex: 1, backgroundColor: colors.surface, borderRadius: 18, padding: 18, borderWidth: 1, borderColor: colors.border },
  statNumber: { fontSize: 28, fontWeight: '800', color: colors.primary },
  statLabel: { color: colors.muted, fontWeight: '700' },
  heroCard: { backgroundColor: colors.primaryLight, borderRadius: 22, padding: 22, marginVertical: 12 },
  heroTitle: { color: colors.text, fontSize: 22, fontWeight: '800', marginBottom: 8 },
  heroText: { color: colors.secondary, lineHeight: 22 },
  sectionTitle: { color: colors.text, fontSize: 20, fontWeight: '800', marginVertical: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  menuCard: { width: '30%', minWidth: 105, backgroundColor: colors.surface, borderRadius: 18, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  menuIcon: { fontSize: 26, marginBottom: 8 },
  menuTitle: { fontWeight: '800', color: colors.text, textAlign: 'center' },
  courseCard: { backgroundColor: colors.surface, borderRadius: 18, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: colors.border },
  courseHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  courseTitle: { color: colors.text, fontSize: 18, fontWeight: '800' },
  badge: { backgroundColor: colors.primaryLight, color: colors.primary, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, fontWeight: '800' },
  progressTrack: { height: 8, backgroundColor: colors.background, borderRadius: 999, marginTop: 14, overflow: 'hidden' },
  progressFill: { height: 8, backgroundColor: colors.primary, borderRadius: 999 },
  contentCard: { backgroundColor: colors.surface, borderRadius: 18, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  contentType: { color: colors.primary, fontWeight: '900', marginBottom: 6 },
  contentTitle: { color: colors.text, fontSize: 17, fontWeight: '800' },
  contentDescription: { color: colors.muted, marginTop: 6 },
  chatHeader: { padding: 20, backgroundColor: colors.surface, borderBottomWidth: 1, borderColor: colors.border },
  chatList: { flex: 1 },
  chatContent: { padding: 16, paddingBottom: 24 },
  message: { maxWidth: '82%', borderRadius: 18, padding: 14, marginBottom: 12 },
  userMessage: { backgroundColor: colors.primary, alignSelf: 'flex-end' },
  botMessage: { backgroundColor: colors.surface, alignSelf: 'flex-start', borderWidth: 1, borderColor: colors.border },
  messageText: { color: colors.text, lineHeight: 21 },
  chatInputRow: { flexDirection: 'row', gap: 8, padding: 12, backgroundColor: colors.surface, borderTopWidth: 1, borderColor: colors.border, paddingBottom: 78 },
  chatInput: { flex: 1, backgroundColor: colors.background, borderRadius: 14, paddingHorizontal: 14, borderWidth: 1, borderColor: colors.border },
  sendButton: { backgroundColor: colors.primary, borderRadius: 14, paddingHorizontal: 16, justifyContent: 'center' },
  sendButtonText: { color: colors.surface, fontWeight: '800' },
  profileCard: { alignItems: 'center', backgroundColor: colors.surface, borderRadius: 22, padding: 24, borderWidth: 1, borderColor: colors.border, marginBottom: 14 },
  avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { color: colors.surface, fontSize: 28, fontWeight: '900' },
  profileName: { fontSize: 22, fontWeight: '900', color: colors.text },
  infoLine: { color: colors.secondary, fontSize: 15, lineHeight: 24 },
  tabBar: { position: 'absolute', left: 12, right: 12, bottom: 12, backgroundColor: colors.surface, borderRadius: 22, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', padding: 8 },
  tabItem: { flex: 1, alignItems: 'center', paddingVertical: 10 },
  tabText: { color: colors.muted, fontWeight: '700', fontSize: 12 },
  activeTab: { color: colors.primary },
});
