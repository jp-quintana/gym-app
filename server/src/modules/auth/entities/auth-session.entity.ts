import { Base } from 'src/common/entities';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class AuthSession extends Base {
  @Column({ name: 'refresh_token', type: 'varchar', nullable: false })
  refreshToken: string;

  @Column({ name: 'expires_at', type: 'timestamp', nullable: false })
  expiresAt: Date;

  @Column({ name: 'user_id', type: 'varchar', nullable: false })
  userId: string;

  @ManyToOne(() => User, (user) => user.authSessions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // @Column({ name: 'device_id', type: 'varchar', nullable: true })
  // deviceId?: string;

  // @Column({ name: 'device_type', type: 'varchar', nullable: true })
  // deviceType?: string;

  // @Column({ name: 'ip_address', type: 'varchar', nullable: true })
  // ipAddress?: string;

  // @Column({ name: 'location', type: 'jsonb', nullable: true })
  // location?: Record<string, any>;
}
