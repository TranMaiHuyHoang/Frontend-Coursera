import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import useDebounce from '@/hooks/useDebounce';
import InputText from '../InputText/Indenx';

// debounce: delay thời gian để gọi API 1000ms = 1s
// delay={2000}
// onSearch={setSearch}
// className

type SearchInputProps = {
    delay?: number;
    defaultValue?: string;
    onSearch: (value: string) => void;
    className?: string;
};

export default function SearchInput({
    delay = 1000,
    defaultValue = '',
    onSearch,
    className = '',
}: SearchInputProps) {
    const [keyword, setKeyword] = useState(defaultValue);
    const debouncedKeyword = useDebounce(keyword, delay);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        onSearch(debouncedKeyword.trim());
    }, [debouncedKeyword]);

    return (
        <InputText
            value={keyword}
            onChange={(value) => setKeyword(value)}
            placeholder="Tìm kiếm"
            className={cn(
                'w-full rounded-[8px] border border-[#C6C6C8] bg-transparent px-5 h-10 text-sm transition-all outline-none placeholder:text-[#C6C6C8] placeholder:text-sm focus:border-primary focus:ring-primary',
                className,
            )}
        />
    );
}
