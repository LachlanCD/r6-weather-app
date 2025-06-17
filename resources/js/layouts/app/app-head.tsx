import { Head } from '@inertiajs/react';

type TitleProps = {
    title: string;
};

export default function HeadLayout({ title }: TitleProps) {

    return (
        <Head title={title}>
            <link rel="preconnect" href="https://fonts.bunny.net" />
            <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        </Head>
    )
}
