import { Typography, Stack, Box, TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom';
import {AppRoutes} from '../routers/AppRoutes.js'
import React from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import Tablet from '../src/assets/Tablet.png'

export default function Inscription() {
  const navigate = useNavigate();
  const {handleSubmit, register} = useForm();
  const onSubmit = (data) => {
    if (data.motDePasse != data.confirmationMotDePasse) {
      toast.error("Les mots de passe ne correspondent pas")
    }else{
      axios.get(`http://localhost:3000/utilisateurs?emailUtilisateur=${data.emailUtilisateur}`).then((res => {
        console.log(res)
        if (res.data.length > 0) {
          toast.error("Un compte existe deja avec cette adresse mail")
        }else{
          axios.post("http://localhost:3000/utilisateurs", data).then((res) => {
            console.log(res)
            navigate(AppRoutes.ConnexionPageRoute)
            toast.success("Inscription Reussie")
            console.log(res)
          }).catch((res => {
            console.log(res)
            toast.error("Une erreur est survenue")
          }))
        }
      }))
    }
  };
  return (
    <Stack
    style={{
          backgroundImage: `url(${Tablet})`,
          backgroundPosition: 'center',
          backgroundSize: '1400px',
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
      sx={
        {
          width: 400,
          position: 'relative',
          top: 130,
          right: 135,
          backgroundColor: '#e9da37',
          padding: 3,
        }
      }>
        <Typography variant="h3" marginBottom={3}>Inscription</Typography>
        <form style={{
          marginTop: 4
        }}
        onSubmit={handleSubmit(onSubmit)}
        >
          <Stack direction={"column"} gap={3}>
            <TextField
            id="outlined-basic"
            label="Veuillez saisir votre nom"
            variant="outlined"
            fullWidth
            {...register("nomUtilisateur", {required: "Veuillez saisir un nom",pattern: /^[A-Za-z ]+$/, minLength: {value: 5, message: "Veuillez saisir un nom de plus de 5 caracteres"}})}
            />
            <TextField
            id="outlined-basic"
            label="Veuillez saisir votre adresse mail"
            variant="outlined"
            fullWidth
            type="email"
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
            <TextField
            id="outlined-basic"
            label="Veuillez confirmer votre mot de passe"
            variant="outlined"
            fullWidth
            type='password'{...register("confirmationMotDePasse", {required: "Veuillez saisir un mot de passe", minLength: {value: 8, message: "Veuillez saisir un mot de passe de plus de 8 caracteres"}, maxLength: {value: 16, message: "Veuillez saisir un mot de passe de mois de 16 caracteres"}})}
            />
          </Stack>
          <Button variant="contained"
          sx={{
              marginTop: 3
            }}
            type="submit"
            >Inscription</Button>
            <Typography marginTop={3}>Vous avez deja un compte? <Link style={{color:'blue'}} to={AppRoutes.ConnexionPageRoute}>Connecter-vous</Link></Typography>
        </form>
      </Box>
    </Stack>
  )
}