import { Base } from 'src/common/entities';
import { AuthSession } from 'src/modules/auth/entities';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends Base {
  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  verified: boolean;

  @OneToMany(() => AuthSession, (authSession) => authSession.user)
  authSessions: AuthSession[];
}
