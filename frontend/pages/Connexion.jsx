import { Typography, Stack, Box, TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import {AppRoutes} from '../routers/AppRoutes.js'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import Computer from '../src/assets/Computer.png'

export default function Connexion() {
  useEffect(() => {
    if (localStorage.getItem("utilisateur")) {
      navigate(AppRoutes.DashboardPageRoute)
    }
  })
  const navigate = useNavigate();
  const {handleSubmit, register} = useForm();
  const onSubmit = (data) => {
    axios.get(`http://localhost:3000/utilisateurs?emailUtilisateur=${data.emailUtilisateur}&motDePasse=${data.motDePasse}`)
    .then((res) =>{
      if (res.data.length > 0) {
        localStorage.setItem("utilisateur", JSON.stringify(res.data[0]))
        navigate(AppRoutes.DashboardPageRoute)
        toast.success("Connexion Reussie")
      }else{
        toast.error("Mot de passe ou Email incorrect")
      }
    })
  };
  return (
    <Stack
    style={{
      backgroundImage: `url(${Computer})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      position: 'absolute',
      backgroundColor: 'black',
    }}
    alignItems={"center"}
    justifyContent={"center"}
    width={"100%"}
    height={"100vh"}
    backgroundColor={"#f5f5f5"}>
      <Box
      width={500}
      position="relative"
      sx={
        {
          backgroundColor: "white",
          width: 500,
          bottom: 50,
          padding: 3,
        }
      }>
        <Typography variant="h3" marginBottom={3}>Connexion</Typography>
        <form style={{
          marginTop: 4,
          
        }}
        position="relative"
        onSubmit={handleSubmit(onSubmit)}
        >
          <Stack direction={"column"} gap={3}>
            <TextField
            id="outlined-basic"
            label="Veuillez saisir votre adresse mail"
            variant="outlined"
            fullWidth
            type="emailimport {AppRoutes} from './AppRoutes.js'"
            {...register("emailUtilisateur", {required: "Veuillez saisir votre adresse mail", pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/})}
            />
            <TextField
            id="outlined-basic"
            label="Veuillez saisir un mot de passe"
            variant="outlined"
            fullWidth
            type='password'
            {...register("motDePasse", {required: "Veuillez saisir un mot de passe", minLength: {value: 8, message: "Veuillez saisir un mot de passe de plus de 8 caracteres"}, maxLength: {value: 16, message: "Veuillez saisir un mot de passe de mois de 16 caracteres"}})}
            />
          </Stack>
          <Button variant="contained"
          sx={{
              marginTop: 3
            }}
            type="submit"
            >Connexion</Button>
            <Typography marginTop={3}>Vous n'avez pas de compte? <Link style={{color:'blue'}} to={AppRoutes.InscriptionPageRoute}>Incrivez-vous</Link></Typography>
        </form>
      </Box>
    </Stack>
  )
}
