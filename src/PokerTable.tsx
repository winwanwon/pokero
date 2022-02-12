import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { DatabaseReference, onValue } from '@firebase/database';
import { UserDatabase } from './types';

interface OwnProps {
    usersRef: DatabaseReference;
}

const PokerTable: React.FC<OwnProps> = (props: OwnProps) => {
    const { usersRef } = props;
    const [users, setUsers] = useState<UserDatabase>({});

    useEffect(() => {
        onValue(usersRef, (snapshot) => {
            const dbSnap = snapshot.val();
            snapshot.size && setUsers(dbSnap);
        });
    }, [usersRef]);

    const renderAttendees = Object.keys(users).map((key) => {
        return (
            <Stack key={key} alignItems="center" marginX={2} marginY={2}>
                <Box
                    borderRadius={50}
                    width={120}
                    height={120}
                    bgcolor="primary.main"
                    border={6}
                    borderColor={users[key].selectedOption >= 0 ? 'secondary.main' : 'primary.main'}
                >
                    <Typography
                        variant="h2"
                        color="white"
                        textAlign="center"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                    >
                        {users[key].name[0]}
                    </Typography>
                </Box>
                <Typography variant="h5" textAlign="center" marginTop={1}>
                    {users[key].name}
                </Typography>
            </Stack>
        );
    });

    return (
        <Stack
            direction="row"
            justifyContent="center">
            {renderAttendees}
        </Stack>
    );
}

export default PokerTable;
