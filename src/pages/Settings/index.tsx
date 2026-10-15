import { useState } from 'react';
import type React from 'react';
import {
    User,
    Lock,
    Bell,
    Sliders,
    CreditCard,
    ShieldAlert,
    Camera,
    Save,
    CheckCircle2,
    Laptop,
    Smartphone,
    Download,
    Plus,
    KeyRound,
    ShieldCheck,
    AlertTriangle,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '@/contexts/authContext';

type TabType = 'profile' | 'security' | 'notifications' | 'preferences' | 'billing' | 'danger';

export default function Settings() {
    const { user, setUser } = useAuth();
    const [activeTab, setActiveTab] = useState<TabType>('profile');
    const [isSaving, setIsSaving] = useState(false);

    // Profile Mock Form State
    const [profile, setProfile] = useState({
        fullName: user?.fullName || 'John Doe',
        email: user?.email || 'john.doe@coursera.edu',
        phone: user?.phone?.toString() || '0912345678',
        role: user?.role || 'Student & Frontend Developer',
        bio: 'Đam mê học hỏi công nghệ mới, đặc biệt là React, TypeScript và thiết kế UI/UX hiện đại.',
        avatar:
            user?.avatar ||
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        website: 'https://johndoe.dev',
        location: 'Hà Nội, Việt Nam',
        language: 'vi',
    });

    // Password State
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    // Security Options State
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [sessionTimeout, setSessionTimeout] = useState('30_days');

    // Notification State
    const [notifications, setNotifications] = useState({
        courseUpdates: true,
        emailDigest: true,
        assignmentReminders: true,
        replyComments: true,
        marketingEmails: false,
        browserPush: true,
    });

    // Preferences State
    const [preferences, setPreferences] = useState({
        theme: 'light',
        defaultLanguage: 'vi',
        videoQuality: '1080p',
        autoplayNext: true,
        defaultSubtitles: true,
        soundEffects: true,
    });

    // Active Sessions Mock Data
    const [sessions, setSessions] = useState([
        {
            id: '1',
            device: 'MacBook Pro 16" (M3 Max)',
            browser: 'Chrome 128.0 (macOS Sequoia)',
            ip: '113.190.234.12 (Hà Nội, VN)',
            lastActive: 'Đang hoạt động (Hiện tại)',
            isCurrent: true,
            icon: Laptop,
        },
        {
            id: '2',
            device: 'iPhone 15 Pro',
            browser: 'Coursera Mobile App 4.2',
            ip: '113.190.234.88 (Hà Nội, VN)',
            lastActive: '2 giờ trước',
            isCurrent: false,
            icon: Smartphone,
        },
        {
            id: '3',
            device: 'Windows Workstation',
            browser: 'Firefox 130.0 (Windows 11)',
            ip: '14.161.42.105 (Đà Nẵng, VN)',
            lastActive: '3 ngày trước',
            isCurrent: false,
            icon: Laptop,
        },
    ]);

    // Billing Invoices Mock Data
    const invoices = [
        {
            id: 'INV-2026-003',
            date: '15/09/2026',
            plan: 'Coursera Plus (Gói năm)',
            amount: '3.990.000 đ',
            status: 'Thành công',
        },
        {
            id: 'INV-2025-002',
            date: '15/09/2025',
            plan: 'Coursera Plus (Gói năm)',
            amount: '3.490.000 đ',
            status: 'Thành công',
        },
        {
            id: 'INV-2024-001',
            date: '10/06/2024',
            plan: 'Khóa học React Professional Specialization',
            amount: '1.290.000 đ',
            status: 'Thành công',
        },
    ];

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            if (user) {
                setUser({
                    ...user,
                    fullName: profile.fullName,
                    email: profile.email,
                    phone: Number(profile.phone) || user.phone,
                    role: profile.role,
                    avatar: profile.avatar,
                });
            }
            toast.success('Thông tin cá nhân đã được lưu thành công!');
        }, 600);
    };

    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (!passwordForm.currentPassword) {
            toast.error('Vui lòng nhập mật khẩu hiện tại');
            return;
        }
        if (passwordForm.newPassword.length < 6) {
            toast.error('Mật khẩu mới phải có ít nhất 6 ký tự');
            return;
        }
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast.error('Xác nhận mật khẩu không trùng khớp');
            return;
        }

        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            toast.success('Đổi mật khẩu thành công!');
        }, 700);
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setProfile((prev) => ({ ...prev, avatar: previewUrl }));
            toast.info('Đã tải ảnh đại diện mới lên (bản xem trước)');
        }
    };

    const handleRevokeSession = (sessionId: string) => {
        setSessions((prev) => prev.filter((s) => s.id !== sessionId));
        toast.success('Đã đăng xuất khỏi thiết bị đã chọn');
    };

    const tabs = [
        { id: 'profile', label: 'Hồ sơ cá nhân', icon: User },
        { id: 'security', label: 'Bảo mật & Mật khẩu', icon: Lock },
        { id: 'notifications', label: 'Thông báo', icon: Bell },
        { id: 'preferences', label: 'Tùy chọn học tập', icon: Sliders },
        { id: 'billing', label: 'Gói & Thanh toán', icon: CreditCard },
        { id: 'danger', label: 'Tài khoản & Dữ liệu', icon: ShieldAlert },
    ];

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm font-medium text-purple-600">
                    <span>Tài khoản</span>
                    <span>/</span>
                    <span className="text-gray-500">Cài đặt</span>
                </div>
                <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                    Cài đặt hệ thống
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Quản lý thông tin tài khoản, bảo mật, thông báo và trải nghiệm học tập của bạn.
                </p>
            </div>

            {/* Layout */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-3">
                    <nav className="space-y-1.5 rounded-2xl border border-gray-200 bg-white p-3 shadow-xs">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            const isDanger = tab.id === 'danger';

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as TabType)}
                                    className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-medium transition-all ${
                                        isActive
                                            ? isDanger
                                                ? 'bg-red-50 text-red-700 font-semibold shadow-xs'
                                                : 'bg-purple-50 text-purple-700 font-semibold shadow-xs'
                                            : isDanger
                                            ? 'text-red-600 hover:bg-red-50/60'
                                            : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
                                    }`}
                                >
                                    <Icon
                                        size={18}
                                        className={
                                            isActive
                                                ? isDanger
                                                    ? 'text-red-600'
                                                    : 'text-purple-600'
                                                : isDanger
                                                ? 'text-red-500'
                                                : 'text-gray-400'
                                        }
                                    />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>

                    {/* Pro Badge Card */}
                    <div className="mt-6 rounded-2xl border border-purple-100 bg-linear-to-br from-purple-50 via-white to-indigo-50 p-5 shadow-xs">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center rounded-full bg-purple-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                                PRO MEMBER
                            </span>
                            <span className="text-xs font-medium text-purple-700">Coursera Plus</span>
                        </div>
                        <p className="mt-2.5 text-xs text-gray-600 leading-relaxed">
                            Bạn đang có quyền truy cập không giới hạn hơn 7,000+ khóa học và chứng chỉ chuyên nghiệp.
                        </p>
                        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                            <span>Hết hạn:</span>
                            <span className="font-semibold text-gray-800">31/12/2026</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Pane */}
                <div className="lg:col-span-9 space-y-6">
                    {/* 1. PROFILE TAB */}
                    {activeTab === 'profile' && (
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
                            <div className="border-b border-gray-100 pb-5">
                                <h2 className="text-lg font-bold text-gray-900">Thông tin cá nhân</h2>
                                <p className="text-xs sm:text-sm text-gray-500">
                                    Cập nhật ảnh đại diện và chi tiết hồ sơ công khai của bạn.
                                </p>
                            </div>

                            <form onSubmit={handleSaveProfile} className="mt-6 space-y-6">
                                {/* Avatar Section */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                                    <div className="relative group">
                                        <img
                                            src={profile.avatar}
                                            alt="Avatar"
                                            className="h-24 w-24 rounded-full object-cover ring-4 ring-purple-100 border border-gray-200"
                                        />
                                        <label
                                            htmlFor="avatar-upload"
                                            className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-purple-600 text-white shadow-md transition hover:bg-purple-700"
                                        >
                                            <Camera size={15} />
                                        </label>
                                        <input
                                            id="avatar-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleAvatarChange}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-sm font-semibold text-gray-900">Ảnh hồ sơ</h3>
                                        <p className="text-xs text-gray-500">
                                            Hỗ trợ định dạng JPG, PNG hoặc GIF. Kích thước tối đa 5MB.
                                        </p>
                                        <div className="flex gap-2 pt-1">
                                            <label
                                                htmlFor="avatar-upload"
                                                className="cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                Tải ảnh mới
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setProfile((prev) => ({
                                                        ...prev,
                                                        avatar:
                                                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
                                                    }));
                                                    toast.info('Đã khôi phục ảnh mặc định');
                                                }}
                                                className="rounded-lg px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-red-600"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Grid */}
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Họ và tên
                                        </label>
                                        <input
                                            type="text"
                                            value={profile.fullName}
                                            onChange={(e) =>
                                                setProfile({ ...profile, fullName: e.target.value })
                                            }
                                            required
                                            className="mt-1.5 w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Vai trò / Nghề nghiệp
                                        </label>
                                        <input
                                            type="text"
                                            value={profile.role}
                                            onChange={(e) =>
                                                setProfile({ ...profile, role: e.target.value })
                                            }
                                            className="mt-1.5 w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Địa chỉ Email
                                        </label>
                                        <div className="relative mt-1.5">
                                            <input
                                                type="email"
                                                value={profile.email}
                                                onChange={(e) =>
                                                    setProfile({ ...profile, email: e.target.value })
                                                }
                                                required
                                                className="w-full rounded-xl border border-gray-300 pl-3.5 pr-24 py-2.5 text-sm text-gray-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                                            />
                                            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 rounded-md bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                                                <CheckCircle2 size={12} /> Đã xác thực
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Số điện thoại
                                        </label>
                                        <input
                                            type="tel"
                                            value={profile.phone}
                                            onChange={(e) =>
                                                setProfile({ ...profile, phone: e.target.value })
                                            }
                                            className="mt-1.5 w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Địa điểm / Thành phố
                                        </label>
                                        <input
                                            type="text"
                                            value={profile.location}
                                            onChange={(e) =>
                                                setProfile({ ...profile, location: e.target.value })
                                            }
                                            className="mt-1.5 w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Website / Portfolio
                                        </label>
                                        <input
                                            type="url"
                                            value={profile.website}
                                            onChange={(e) =>
                                                setProfile({ ...profile, website: e.target.value })
                                            }
                                            className="mt-1.5 w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                                        Tiểu sử (Bio)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={profile.bio}
                                        onChange={(e) =>
                                            setProfile({ ...profile, bio: e.target.value })
                                        }
                                        className="mt-1.5 w-full rounded-xl border border-gray-300 p-3.5 text-sm text-gray-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                                    />
                                    <p className="mt-1 text-xs text-gray-400">
                                        Mô tả ngắn gọn về bạn và mục tiêu học tập.
                                    </p>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => toast.info('Đã hủy các thay đổi chưa lưu')}
                                        className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                                    >
                                        Hủy bỏ
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700 disabled:opacity-50"
                                    >
                                        <Save size={16} />
                                        {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* 2. SECURITY TAB */}
                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            {/* Change Password Card */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
                                <div className="border-b border-gray-100 pb-5">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                                            <KeyRound size={18} />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-900">Đổi mật khẩu</h2>
                                            <p className="text-xs sm:text-sm text-gray-500">
                                                Để đảm bảo an toàn, hãy sử dụng mật khẩu mạnh kết hợp chữ và số.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <form onSubmit={handleUpdatePassword} className="mt-6 space-y-4 max-w-xl">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Mật khẩu hiện tại
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            value={passwordForm.currentPassword}
                                            onChange={(e) =>
                                                setPasswordForm({
                                                    ...passwordForm,
                                                    currentPassword: e.target.value,
                                                })
                                            }
                                            className="mt-1.5 w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Mật khẩu mới
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Tối thiểu 6 ký tự"
                                            value={passwordForm.newPassword}
                                            onChange={(e) =>
                                                setPasswordForm({
                                                    ...passwordForm,
                                                    newPassword: e.target.value,
                                                })
                                            }
                                            className="mt-1.5 w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Xác nhận mật khẩu mới
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Nhập lại mật khẩu mới"
                                            value={passwordForm.confirmPassword}
                                            onChange={(e) =>
                                                setPasswordForm({
                                                    ...passwordForm,
                                                    confirmPassword: e.target.value,
                                                })
                                            }
                                            className="mt-1.5 w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                                        />
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={isSaving}
                                            className="rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700 disabled:opacity-50"
                                        >
                                            {isSaving ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* 2FA Card */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                                            <ShieldCheck size={22} />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-gray-900">
                                                Xác thực 2 yếu tố (2FA)
                                            </h3>
                                            <p className="mt-0.5 text-xs sm:text-sm text-gray-500">
                                                Tăng cường lớp bảo vệ cho tài khoản thông qua ứng dụng Google Authenticator hoặc tin nhắn SMS.
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            const nextState = !twoFactorAuth;
                                            setTwoFactorAuth(nextState);
                                            toast[nextState ? 'success' : 'info'](
                                                nextState
                                                    ? 'Đã kích hoạt xác thực 2 bước 2FA'
                                                    : 'Đã tắt xác thực 2 bước 2FA',
                                            );
                                        }}
                                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                            twoFactorAuth ? 'bg-purple-600' : 'bg-gray-200'
                                        }`}
                                    >
                                        <span
                                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                                twoFactorAuth ? 'translate-x-5' : 'translate-x-0'
                                            }`}
                                        />
                                    </button>
                                </div>

                                <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            Thời gian duy trì phiên đăng nhập
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Tự động yêu cầu đăng nhập lại sau khoảng thời gian không hoạt động.
                                        </p>
                                    </div>
                                    <select
                                        value={sessionTimeout}
                                        onChange={(e) => {
                                            setSessionTimeout(e.target.value);
                                            toast.success('Đã lưu thời gian duy trì phiên');
                                        }}
                                        className="rounded-xl border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 outline-none focus:border-purple-600"
                                    >
                                        <option value="7_days">7 ngày</option>
                                        <option value="30_days">30 ngày (Khuyên dùng)</option>
                                        <option value="90_days">90 ngày</option>
                                    </select>
                                </div>
                            </div>

                            {/* Active Sessions */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
                                <div className="border-b border-gray-100 pb-5">
                                    <h3 className="text-base font-bold text-gray-900">
                                        Thiết bị đang đăng nhập
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        Danh sách các phiên và thiết bị đã đăng nhập vào tài khoản của bạn.
                                    </p>
                                </div>

                                <div className="mt-5 divide-y divide-gray-100">
                                    {sessions.map((session) => {
                                        const DeviceIcon = session.icon;
                                        return (
                                            <div
                                                key={session.id}
                                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                                            >
                                                <div className="flex items-start gap-3.5">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                                                        <DeviceIcon size={20} />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-sm font-semibold text-gray-900">
                                                                {session.device}
                                                            </p>
                                                            {session.isCurrent && (
                                                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold uppercase text-green-700">
                                                                    Thiết bị này
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-500">
                                                            {session.browser} • {session.ip}
                                                        </p>
                                                        <p className="text-xs text-gray-400 mt-0.5">
                                                            Hoạt động: {session.lastActive}
                                                        </p>
                                                    </div>
                                                </div>

                                                {!session.isCurrent && (
                                                    <button
                                                        onClick={() => handleRevokeSession(session.id)}
                                                        className="text-xs font-medium text-red-600 hover:text-red-700 hover:underline"
                                                    >
                                                        Đăng xuất thiết bị
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 3. NOTIFICATIONS TAB */}
                    {activeTab === 'notifications' && (
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
                            <div className="border-b border-gray-100 pb-5">
                                <h2 className="text-lg font-bold text-gray-900">Cài đặt thông báo</h2>
                                <p className="text-xs sm:text-sm text-gray-500">
                                    Chọn loại thông báo bạn muốn nhận qua Email và Trình duyệt.
                                </p>
                            </div>

                            <div className="mt-6 space-y-6 divide-y divide-gray-100">
                                <div className="flex items-center justify-between pt-4 first:pt-0">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            Cập nhật khóa học và bài giảng mới
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Nhận thông báo khi khóa học bạn đang theo dõi có nội dung mới được cập nhật.
                                        </p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={notifications.courseUpdates}
                                        onChange={(e) => {
                                            setNotifications({
                                                ...notifications,
                                                courseUpdates: e.target.checked,
                                            });
                                            toast.success('Đã lưu tùy chọn thông báo');
                                        }}
                                        className="h-4 w-4 rounded text-purple-600 focus:ring-purple-500"
                                    />
                                </div>

                                <div className="flex items-center justify-between pt-4">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            Nhắc nhở học tập & Hạn nộp bài
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Nhắc nhở định kỳ để bạn không bỏ lỡ mục tiêu học tập tuần này.
                                        </p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={notifications.assignmentReminders}
                                        onChange={(e) => {
                                            setNotifications({
                                                ...notifications,
                                                assignmentReminders: e.target.checked,
                                            });
                                            toast.success('Đã lưu tùy chọn thông báo');
                                        }}
                                        className="h-4 w-4 rounded text-purple-600 focus:ring-purple-500"
                                    />
                                </div>

                                <div className="flex items-center justify-between pt-4">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            Phản hồi & Thảo luận
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Thông báo khi giảng viên hoặc học viên khác trả lời bình luận của bạn.
                                        </p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={notifications.replyComments}
                                        onChange={(e) => {
                                            setNotifications({
                                                ...notifications,
                                                replyComments: e.target.checked,
                                            });
                                            toast.success('Đã lưu tùy chọn thông báo');
                                        }}
                                        className="h-4 w-4 rounded text-purple-600 focus:ring-purple-500"
                                    />
                                </div>

                                <div className="flex items-center justify-between pt-4">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            Thông báo đẩy trên trình duyệt
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Nhận thông báo nổi ngay cả khi bạn không mở tab Coursera.
                                        </p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={notifications.browserPush}
                                        onChange={(e) => {
                                            setNotifications({
                                                ...notifications,
                                                browserPush: e.target.checked,
                                            });
                                            toast.success('Đã lưu tùy chọn thông báo');
                                        }}
                                        className="h-4 w-4 rounded text-purple-600 focus:ring-purple-500"
                                    />
                                </div>

                                <div className="flex items-center justify-between pt-4">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            Bản tin khuyến mãi & Ưu đãi đặc biệt
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Cập nhật các chương trình giảm giá và ưu đãi thành viên hàng tháng.
                                        </p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={notifications.marketingEmails}
                                        onChange={(e) => {
                                            setNotifications({
                                                ...notifications,
                                                marketingEmails: e.target.checked,
                                            });
                                            toast.success('Đã lưu tùy chọn thông báo');
                                        }}
                                        className="h-4 w-4 rounded text-purple-600 focus:ring-purple-500"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 4. PREFERENCES TAB */}
                    {activeTab === 'preferences' && (
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
                            <div className="border-b border-gray-100 pb-5">
                                <h2 className="text-lg font-bold text-gray-900">Tùy chọn học tập</h2>
                                <p className="text-xs sm:text-sm text-gray-500">
                                    Tùy chỉnh giao diện hiển thị, trình phát video và trải nghiệm học tập.
                                </p>
                            </div>

                            <div className="mt-6 space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Ngôn ngữ giao diện mặc định
                                        </label>
                                        <select
                                            value={preferences.defaultLanguage}
                                            onChange={(e) => {
                                                setPreferences({
                                                    ...preferences,
                                                    defaultLanguage: e.target.value,
                                                });
                                                toast.success('Đã cập nhật ngôn ngữ hiển thị');
                                            }}
                                            className="mt-1.5 w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                                        >
                                            <option value="vi">Tiếng Việt (Vietnamese)</option>
                                            <option value="en">English (US)</option>
                                            <option value="ja">日本語 (Japanese)</option>
                                            <option value="fr">Français (French)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                                            Chất lượng video mặc định
                                        </label>
                                        <select
                                            value={preferences.videoQuality}
                                            onChange={(e) => {
                                                setPreferences({
                                                    ...preferences,
                                                    videoQuality: e.target.value,
                                                });
                                                toast.success('Đã cập nhật chất lượng phát video');
                                            }}
                                            className="mt-1.5 w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                                        >
                                            <option value="auto">Tự động (Khuyên dùng)</option>
                                            <option value="1080p">Full HD 1080p</option>
                                            <option value="720p">HD 720p (Tiết kiệm dữ liệu)</option>
                                            <option value="4k">Ultra HD 4K</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="divide-y divide-gray-100 border-t border-gray-100 pt-4">
                                    <div className="flex items-center justify-between py-3">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">
                                                Tự động phát video kế tiếp (Autoplay)
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Tự động chuyển sang bài giảng tiếp theo sau khi hoàn thành video.
                                            </p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={preferences.autoplayNext}
                                            onChange={(e) => {
                                                setPreferences({
                                                    ...preferences,
                                                    autoplayNext: e.target.checked,
                                                });
                                                toast.success('Đã lưu tùy chọn');
                                            }}
                                            className="h-4 w-4 rounded text-purple-600 focus:ring-purple-500"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between py-3">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">
                                                Bật phụ đề tiếng Việt tự động
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Hiển thị phụ đề phụ ngữ mỗi khi mở bất kỳ bài giảng nào.
                                            </p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={preferences.defaultSubtitles}
                                            onChange={(e) => {
                                                setPreferences({
                                                    ...preferences,
                                                    defaultSubtitles: e.target.checked,
                                                });
                                                toast.success('Đã lưu tùy chọn');
                                            }}
                                            className="h-4 w-4 rounded text-purple-600 focus:ring-purple-500"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between py-3">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">
                                                Hiệu ứng âm thanh tương tác
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Phát âm thanh chúc mừng khi hoàn thành bài tập hoặc nhận chứng chỉ.
                                            </p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={preferences.soundEffects}
                                            onChange={(e) => {
                                                setPreferences({
                                                    ...preferences,
                                                    soundEffects: e.target.checked,
                                                });
                                                toast.success('Đã lưu tùy chọn');
                                            }}
                                            className="h-4 w-4 rounded text-purple-600 focus:ring-purple-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 5. BILLING TAB */}
                    {activeTab === 'billing' && (
                        <div className="space-y-6">
                            {/* Current Plan Card */}
                            <div className="rounded-2xl border border-purple-200 bg-linear-to-r from-purple-900 via-indigo-900 to-purple-800 p-6 sm:p-8 text-white shadow-md">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <span className="rounded-full bg-purple-400/30 px-3 py-1 text-xs font-semibold tracking-wide text-purple-200 uppercase">
                                            Gói đang sử dụng
                                        </span>
                                        <h3 className="mt-2 text-2xl font-bold">Coursera Plus Premium</h3>
                                        <p className="mt-1 text-xs sm:text-sm text-purple-200">
                                            Học không giới hạn • Chứng chỉ vô thời hạn • Hỗ trợ kèm riêng 1:1
                                        </p>
                                    </div>
                                    <div className="text-left sm:text-right">
                                        <div className="text-2xl sm:text-3xl font-extrabold">3.990.000 đ</div>
                                        <div className="text-xs text-purple-200">Gia hạn ngày 15/09/2027</div>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t border-purple-700/60">
                                    <button
                                        type="button"
                                        onClick={() => toast.info('Chức năng nâng cấp gói đang phát triển')}
                                        className="rounded-xl bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-purple-900 hover:bg-purple-50"
                                    >
                                        Đổi gói thành viên
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => toast.info('Gói cước đã được thiết lập gia hạn tự động')}
                                        className="rounded-xl border border-purple-400/40 px-4 py-2 text-xs sm:text-sm font-semibold text-purple-100 hover:bg-purple-800/60"
                                    >
                                        Quản lý tự động gia hạn
                                    </button>
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
                                <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                                    <div>
                                        <h3 className="text-base font-bold text-gray-900">
                                            Phương thức thanh toán
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            Thẻ tín dụng / Ghi nợ quốc tế đã liên kết.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => toast.info('Mở hộp thoại thêm thẻ thanh toán')}
                                        className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                                    >
                                        <Plus size={14} /> Thêm thẻ mới
                                    </button>
                                </div>

                                <div className="mt-5 space-y-3">
                                    <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
                                        <div className="flex items-center gap-3.5">
                                            <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-blue-600 font-black tracking-widest text-white text-[11px] italic">
                                                VISA
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    Visa kết thúc bằng •••• 8899
                                                </p>
                                                <p className="text-xs text-gray-500">Hết hạn: 08/2029 (Mặc định)</p>
                                            </div>
                                        </div>
                                        <span className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700">
                                            Mặc định
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Invoices */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
                                <div className="border-b border-gray-100 pb-5">
                                    <h3 className="text-base font-bold text-gray-900">Lịch sử hóa đơn</h3>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        Tải về hóa đơn các giao dịch đã thực hiện.
                                    </p>
                                </div>

                                <div className="mt-4 overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead>
                                            <tr className="border-b border-gray-100 text-xs font-semibold uppercase text-gray-400">
                                                <th className="py-3">Mã đơn</th>
                                                <th className="py-3">Ngày</th>
                                                <th className="py-3">Mô tả</th>
                                                <th className="py-3">Số tiền</th>
                                                <th className="py-3">Trạng thái</th>
                                                <th className="py-3 text-right">Tải về</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {invoices.map((inv) => (
                                                <tr key={inv.id} className="text-gray-700">
                                                    <td className="py-3.5 font-medium text-gray-900">{inv.id}</td>
                                                    <td className="py-3.5 text-xs text-gray-500">{inv.date}</td>
                                                    <td className="py-3.5">{inv.plan}</td>
                                                    <td className="py-3.5 font-semibold text-gray-900">{inv.amount}</td>
                                                    <td className="py-3.5">
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                                                            <CheckCircle2 size={12} /> {inv.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-3.5 text-right">
                                                        <button
                                                            onClick={() => toast.success(`Đang tải hóa đơn ${inv.id}`)}
                                                            className="inline-flex items-center gap-1 text-xs font-medium text-purple-600 hover:text-purple-700"
                                                        >
                                                            <Download size={14} /> PDF
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 6. DANGER ZONE TAB */}
                    {activeTab === 'danger' && (
                        <div className="rounded-2xl border border-red-200 bg-white p-6 sm:p-8 shadow-xs">
                            <div className="border-b border-red-100 pb-5">
                                <div className="flex items-center gap-2.5 text-red-600">
                                    <AlertTriangle size={20} />
                                    <h2 className="text-lg font-bold">Khu vực nguy hiểm</h2>
                                </div>
                                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                                    Các hành động dưới đây sẽ ảnh hưởng trực tiếp đến dữ liệu và quyền truy cập tài khoản của bạn.
                                </p>
                            </div>

                            <div className="mt-6 space-y-6 divide-y divide-gray-100">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 first:pt-0">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            Tạm khóa tài khoản
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Tạm ẩn hồ sơ và tạm ngừng thông báo. Bạn có thể mở khóa lại bất cứ lúc nào khi đăng nhập lại.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => toast.warning('Bạn vừa gửi yêu cầu tạm khóa tài khoản')}
                                        className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 shrink-0"
                                    >
                                        Tạm khóa tài khoản
                                    </button>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6">
                                    <div>
                                        <p className="text-sm font-semibold text-red-600">
                                            Xóa vĩnh viễn tài khoản
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Toàn bộ lịch sử học tập, chứng chỉ và dữ liệu cá nhân sẽ bị xóa vĩnh viễn và không thể khôi phục.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (window.confirm('CẢNH BÁO: Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản này? Hành động này không thể hoàn tác!')) {
                                                toast.error('Yêu cầu xóa tài khoản đã được tiếp nhận.');
                                            }
                                        }}
                                        className="rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 shadow-sm shrink-0"
                                    >
                                        Xóa tài khoản vĩnh viễn
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
