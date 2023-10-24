<template>
  <v-app>
    <v-main>
      <NavbarMain />
      <HomePage />
      <ProfileSkills />
      <ProjectCards />
      <ContactForm />
      <SwiperComponent />
    </v-main>
  </v-app>
</template>
<script>
import NavbarMain from './components/navbar/NavbarMain';
import HomePage from './components/HomePage';
import ProfileSkills from './components/ProfileSkills';
import ProjectCards from './components/ProjectCards';
import ContactForm from './components/ContactForm';
import SwiperComponent from './components/SwiperComponent';

export default {
  components: {
    NavbarMain,
    HomePage,
    ProfileSkills,
    ProjectCards,
    ContactForm,
    SwiperComponent,
  },
  data() {
    return {
      
    }
  },
};
</script>
