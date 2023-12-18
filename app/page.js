// page.js - This file is the main / root 'home page' for the app.

import "server-only"
import AuthTest from "./components/auth-test"
import BackendFetchTest from "./components/backend-fetch-test"

export default function Home() {

  return (
    <>
    <p>Main page</p>
    <AuthTest/>
    <BackendFetchTest/>
    </>
  )
}