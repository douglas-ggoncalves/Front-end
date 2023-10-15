<template>
  <v-app>
    <v-main>
      <NavbarMain />
      <HomePage />
      <ProfileSkills />
      <ProjectCards />
      <ContactForm />
    </v-main>
  </v-app>
</template>

<script>
import NavbarMain from './components/navbar/NavbarMain';
import HomePage from './components/HomePage';
import ProfileSkills from './components/ProfileSkills';
import ProjectCards from './components/ProjectCards';
import ContactForm from './components/ContactForm';

export default {
  name: 'App',
  components: {
    NavbarMain,
    HomePage,
    ProfileSkills,
    ProjectCards,
    ContactForm
  },
};
</script>
