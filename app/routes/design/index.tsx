import { LoaderFunction, redirect } from '@remix-run/node'

// Nothing lives here, redirect to the homepage
export const loader: LoaderFunction = async () => {
    return redirect('/')
}
